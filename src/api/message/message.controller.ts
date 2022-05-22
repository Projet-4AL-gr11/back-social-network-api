import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import Message from './domain/entities/message.entity';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':id')
  getAllMessage(@Param('id') id: string): Promise<Message[]> {
    return this.messageService.getAllMessages(id);
  }
}
