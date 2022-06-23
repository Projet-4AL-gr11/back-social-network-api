import { JoinedConversationDto } from '../../domain/dto/joined-conversation.dto';

export class CreateJoinedConversationCommand {
  constructor(public readonly joinedConversationDto: JoinedConversationDto) {}
}
