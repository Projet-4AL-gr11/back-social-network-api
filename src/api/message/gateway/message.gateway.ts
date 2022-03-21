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

@WebSocketGateway()
export class MessageGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  async handleConnection(socket: Socket): Promise<any> {
    await this.messageService.getUserFromSocket(socket);
  }

  @SubscribeMessage('send_message')
  async listenForMessage(
    @MessageBody() content: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const author = await this.messageService.getUserFromSocket(socket);
    const message = await this.messageService.saveMessage(content, author);
    this.server.sockets.emit('receive_message', { content, author });

    return message;
  }

  @SubscribeMessage('request_all_messages')
  async requestAllMessages(
    @ConnectedSocket() socket: Socket,
  ) {
    await this.messageService.getUserFromSocket(socket);
    const messages = await this.messageService.getAllMessages();

    socket.emit('send_all_messages', messages);
  }
}
