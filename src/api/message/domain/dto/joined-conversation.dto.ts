import { Conversation } from '../../../conversation/domain/entities/conversation.entity';
import { User } from '../../../user/domain/entities/user.entity';

export class JoinedConversationDto {
  constructor(
    public readonly socketId: string,
    public readonly user: User,
    public readonly conversation: Conversation,
  ) {}
}
