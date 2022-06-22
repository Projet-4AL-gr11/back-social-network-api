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
import { UnauthorizedException } from '@nestjs/common';
import { ConversationService } from '../../conversation/conversation.service';
import { User } from '../../user/domain/entities/user.entity';

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
    private conversationService: ConversationService,
  ) {}

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

        const conversations =
          await this.conversationService.getConversationsWithUserId(user.id);
        this.server.emit('conversations', conversations);
      }
    } catch {
      return this.disconnect(socket);
    }
  }

  handleDisconnect(socket: Socket): any {
    this.disconnect(socket);
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
  // async handleConnection(socket: Socket): Promise<any> {
  //   await this.messageService.getUserFromSocket(socket);
  // }
  // @SubscribeMessage('send_message')
  // async listenForMessage(
  //   @MessageBody() content: string,
  //   @ConnectedSocket() socket: Socket,
  // ) {
  //   const author = await this.messageService.getUserFromSocket(socket);
  //   const message = await this.messageService.saveMessage(
  //     content,
  //     author,
  //     'c6062337-6ce5-45f6-be7c-82a01030965a',
  //   );
  //   this.server.sockets.emit('receive_message', {
  //     content,
  //     author,
  //     conversation: 'c6062337-6ce5-45f6-be7c-82a01030965a',
  //   });
  //
  //   return message;
  // }
  //
  // // @SubscribeMessage('request_all_messages/:id')
  // // async requestAllMessages(
  // //   @ConnectedSocket() socket: Socket,
  // //   @Param('id') conversationId: string,
  // @SubscribeMessage('request_all_messages')
  // async requestAllMessages(@ConnectedSocket() socket: Socket) {
  //   await this.messageService.getUserFromSocket(socket);
  //   const messages = await this.messageService.getAllMessages(
  //     'c6062337-6ce5-45f6-be7c-82a01030965a',
  //   );
  //
  //   socket.emit('send_all_messages', messages);
  // }
}
