import { User } from '../../../user/domain/entities/user.entity';

export class AcceptFriendshipRequestCommand {
  constructor(
    public readonly friendOne: User,
    public readonly friendTwo: string,
  ) {}
}
