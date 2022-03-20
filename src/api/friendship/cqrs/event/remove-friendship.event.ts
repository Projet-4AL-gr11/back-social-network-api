import { User } from '../../../user/domain/entities/user.entity';

export class RemoveFriendshipEvent {
  constructor(
    public readonly senderId: string,
    public readonly userId: string,
  ) {}
}
