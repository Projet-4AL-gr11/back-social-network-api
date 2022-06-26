import { User } from '../../../user/domain/entities/user.entity';
import { Conversation } from '../../../conversation/domain/entities/conversation.entity';

export class CreateMessageCommand {
  constructor(
    public readonly content: string,
    public readonly user: User,
    public readonly conversation: Conversation,
  ) {}
}
