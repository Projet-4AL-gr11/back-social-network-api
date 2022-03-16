import { User } from '../../../user/domain/entities/user.entity';

export class GetStatusFriendshipQuery {
  constructor(
    public readonly currentUser: User,
    public readonly user: string,
  ) {}
}
