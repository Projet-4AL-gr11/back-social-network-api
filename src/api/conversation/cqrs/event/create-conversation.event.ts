import { User } from '../../../user/domain/entities/user.entity';

export class CreateConversationEvent {
  constructor(
    public readonly userList: User[],
    public readonly conversationId: string,
  ) {}
}
