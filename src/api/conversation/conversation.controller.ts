import { Controller, Get, Param } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('Conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversationService.getConversationWithId(id);
  }

  @Get('members/:id')
  getMembers(@Param('id') id: string) {
    return this.conversationService.getMembers(id);
  }
}
