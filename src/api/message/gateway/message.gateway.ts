import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../message.service';
import { AuthService } from '../../auth/auth.service';
import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConversationService } from '../../conversation/conversation.service';
import { User } from '../../user/domain/entities/user.entity';
import { ConversationDto } from '../../conversation/domain/dto/conversation.dto';
import { Conversation } from '../../conversation/domain/entities/conversation.entity';
import { ConnectedUser } from '../domain/entities/connected-user.entity';
import { UserService } from '../../user/user.service';
import Message from '../domain/entities/message.entity';
import { MessageDto } from '../domain/dto/message.dto';
import { JoinedConversation } from '../domain/entities/joined-conversation.entity';

@WebSocketGateway({
  cors: {
    origin: [
      'https://hoppscotch.io',
      'http://localhost:3000',
      'http://localhost:4200',
    ],
  },
})
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  title: string[] = [];

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private userService: UserService,
    private conversationService: ConversationService,
  ) {
    this.messageService.deleteAllConnectedUser().then();
    this.messageService.deleteAllJoinedConversation().then();
  }

  async handleConnection(socket: Socket, ...args: any[]): Promise<any> {
    try {
      let token: string;
      if (socket.handshake.headers.authorization) {
        token = socket.handshake.headers.authorization;
      } else {
        token = socket.handshake.auth.token;
      }
      const user: User = await this.authService.getUserFromAuthToken(token);

      if (!user) {
        return this.disconnect(socket);
      } else {
        socket.data.user = user;
        await this.messageService.createConnectedUser({
          socketId: socket.id,
          user: user,
        });
        const conversations =
          await this.conversationService.getConversationsWithUserId(user.id);
        this.server.emit('conversations', conversations);
      }
    } catch {
      return this.disconnect(socket);
    }
  }

  async handleDisconnect(socket: Socket): Promise<any> {
    this.disconnect(socket);
  }

  async disconnect(socket: Socket) {
    await this.messageService.deleteConnectedUser(socket.id);
    socket.disconnect();
  }

  @SubscribeMessage('createConversation')
  async onCreateConversation(socket: Socket, conversation: ConversationDto) {
    const createdConversation: Conversation =
      await this.conversationService.createConversation(
        conversation,
        socket.data.user,
      );
    const connections: ConnectedUser[] = [];
    for (const user of createdConversation.users) {
      connections.push(await this.messageService.findConnectedUser(user.id));
      const rooms = await this.conversationService.getConversationsWithUserId(
        user.id,
      );
      for (const connection of connections) {
        await this.server.to(connection.socketId).emit('conversations', rooms);
      }
    }
  }

  @SubscribeMessage('joinConversation')
  async onJoinConversation(socket: Socket, conversation: Conversation) {
    const messages = await this.messageService.getAllMessages(conversation.id);

    await this.messageService.createJoinedConversation({
      socketId: socket.id,
      user: socket.data.user,
      conversation,
    });

    await this.server.to(socket.id).emit('messages', messages);
  }

  @SubscribeMessage('leaveConversation')
  async onLeaveConversation(socket: Socket) {
    await this.messageService.deleteJoinedConversationWithSocketId(socket.id);
  }

  @SubscribeMessage('getConversations')
  async onGetConversation(socket: Socket) {
    const conversations =
      await this.conversationService.getConversationsWithUserId(
        socket.data.user.id,
      );
    this.server.emit('conversations', conversations);
  }

  @SubscribeMessage('addMessage')
  async addMessage(socket: Socket, message: MessageDto) {
    const createdMessage: Message = await this.messageService.createMessage(
      message,
      socket.data.user,
    );
    const conversation: Conversation =
      await this.conversationService.getConversationWithId(
        createdMessage.conversation.id,
      );
    const joinedUsers: JoinedConversation[] =
      await this.messageService.getJoinedConversationByConversationId(
        conversation.id,
      );
    for (const user of joinedUsers) {
      this.server.to(user.socketId).emit('messageAdded', createdMessage);
    }
  }
}
