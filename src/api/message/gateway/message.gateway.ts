import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../message.service';
import { Param } from '@nestjs/common';

@WebSocketGateway()
export class MessageGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  async handleConnection(socket: Socket): Promise<any> {
    await this.messageService.getUserFromSocket(socket);
  }

  @SubscribeMessage('send_message/:id')
  async listenForMessage(
    @MessageBody() content: string,
    @ConnectedSocket() socket: Socket,
    @Param('id') conversationId: string,
  ) {
    const author = await this.messageService.getUserFromSocket(socket);
    const message = await this.messageService.saveMessage(
      content,
      author,
      conversationId,
    );
    this.server.sockets.emit('receive_message', {
      content,
      author,
      conversationId,
    });

    return message;
  }

  @SubscribeMessage('request_all_messages/:id')
  async requestAllMessages(
    @ConnectedSocket() socket: Socket,
    @Param('id') conversationId: string,
  ) {
    await this.messageService.getUserFromSocket(socket);
    const messages = await this.messageService.getAllMessages(conversationId);

    socket.emit('send_all_messages', messages);
  }
}
