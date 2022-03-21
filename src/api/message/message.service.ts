import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import Message from './domain/entities/message.entity';
import { User } from '../user/domain/entities/user.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SaveMessageCommand } from './cqrs/command/save-message.command';
import { FindMessageQuery } from './cqrs/query/find-message.query';

@Injectable()
export class MessageService {
  constructor(
    private readonly authService: AuthService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async saveMessage(content: string, author: User): Promise<Message> {
    return await this.commandBus.execute(
      new SaveMessageCommand(content, author),
    );
  }

  async getAllMessages() {
    return await this.queryBus.execute(new FindMessageQuery());
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
}
