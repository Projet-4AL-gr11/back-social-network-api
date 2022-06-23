import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import Message from './domain/entities/message.entity';
import { User } from '../user/domain/entities/user.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SaveMessageCommand } from './cqrs/command/save-message.command';
import { FindMessagesQuery } from './cqrs/query/find-messages.query';
import { GetConnectedUserQuery } from './cqrs/query/get-connected-user.query';
import { CreateConnectedUserCommand } from './cqrs/command/create-connected-user.command';
import { ConnectedUserDto } from './domain/dto/connected-user.dto';
import { GetUserQuery } from '../user/cqrs/query/get-user.query';
import { DeleteConnectedUserCommand } from './cqrs/command/delete-connected-user.command';
import { DeleteAllConnectedUserCommand } from './cqrs/command/delete-all-connected-user.command';
import { DeleteAllJoinedConversationCommand } from './cqrs/command/delete-all-joined-conversation.command';
import { DeleteJoinedConversationBySocketIdCommand } from './cqrs/command/delete-joined-conversation-by-socket-id.command';
import { GetJoinedConversationByConversationIdQuery } from './cqrs/query/get-joined-conversation-by-conversation-id.query';
import { GetJoinedConversationByUserIdQuery } from './cqrs/query/get-joined-conversation-by-user-id.query';
import { JoinedConversationDto } from './domain/dto/joined-conversation.dto';
import { CreateJoinedConversationCommand } from './cqrs/command/create-joined-conversation.command';
import { MessageDto } from './domain/dto/message.dto';
import { GetConversationByIdQuery } from '../conversation/cqrs/query/get-conversation-by-id.query';
import { CreateMessageCommand } from './cqrs/command/create-message.command';

@Injectable()
export class MessageService {
  constructor(
    private readonly authService: AuthService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async saveMessage(
    content: string,
    author: User,
    conversationId: string,
  ): Promise<Message> {
    return await this.commandBus.execute(
      new SaveMessageCommand(content, author, conversationId),
    );
  }

  async getAllMessages(conversationId: string): Promise<Message[]> {
    return await this.queryBus.execute(new FindMessagesQuery(conversationId));
  }

  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    const { Authentication: authenticationToken } = parse(cookie);
    const user = await this.authService.getUserFromAuthToken(
      authenticationToken,
    );
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

  async findConnectedUser(id: string) {
    return this.queryBus.execute(new GetConnectedUserQuery(id));
  }

  async createConnectedUser(connectedUserDto: ConnectedUserDto) {
    return this.commandBus.execute(
      new CreateConnectedUserCommand(
        connectedUserDto.socketId,
        connectedUserDto.user,
      ),
    );
  }

  async deleteConnectedUser(id: string) {
    return this.commandBus.execute(new DeleteConnectedUserCommand(id));
  }

  async deleteAllConnectedUser() {
    // return this.commandBus.execute(new DeleteAllConnectedUserCommand());
  }

  async deleteAllJoinedConversation() {
    // return this.commandBus.execute(new DeleteAllJoinedConversationCommand());
  }

  async deleteJoinedConversationWithSocketId(socketId: string) {
    return this.commandBus.execute(
      new DeleteJoinedConversationBySocketIdCommand(socketId),
    );
  }

  async getJoinedConversationByConversationId(id: string) {
    return this.queryBus.execute(
      new GetJoinedConversationByConversationIdQuery(id),
    );
  }

  async getJoinedConversationByUserId(id: string) {
    return this.queryBus.execute(new GetJoinedConversationByUserIdQuery(id));
  }

  async createJoinedConversation(joinedConversationDto: JoinedConversationDto) {
    return this.commandBus.execute(
      new CreateJoinedConversationCommand(joinedConversationDto),
    );
  }

  async createMessage(messageDto: MessageDto, user: User) {
    const conversation = await this.queryBus.execute(
      new GetConversationByIdQuery(messageDto.conversationId),
    );
    return this.commandBus.execute(
      new CreateMessageCommand(messageDto.content, user, conversation),
    );
  }
}
