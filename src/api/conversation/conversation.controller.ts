import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { ConversationService } from './conversation.service';
import { RequestUser } from '../auth/interface/request-user.interface';
import JwtRefreshGuard from "../auth/guards/jwt-refresh-token.guard";

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

  @Get('isConversationMember/:id')
  @UseGuards(JwtRefreshGuard)
  isConversationMember(
    @Param('id') conversationId: string,
    @Req() request: RequestUser,
  ) {
    return this.conversationService.isMemberOfConversation(
      request.user.id,
      conversationId,
    );
  }
}
