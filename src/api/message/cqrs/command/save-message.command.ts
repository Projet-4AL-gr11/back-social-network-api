import { User } from '../../../user/domain/entities/user.entity';

export class SaveMessageCommand {
  constructor(
    public readonly content: string,
    public readonly author: User,
    public readonly conversationId: string,
  ) {}
}
