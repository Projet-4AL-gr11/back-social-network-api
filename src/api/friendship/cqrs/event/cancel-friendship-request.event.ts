import { User } from '../../../user/domain/entities/user.entity';

export class CancelFriendshipRequestEvent {
  constructor(
    public readonly senderId: string,
    public readonly userId: string,
  ) {}
}
