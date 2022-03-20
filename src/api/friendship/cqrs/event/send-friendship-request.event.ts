import { User } from '../../../user/domain/entities/user.entity';

export class SendFriendshipRequestEvent {
  constructor(
    public readonly senderId: string,
    public readonly userId: string,
  ) {}
}
