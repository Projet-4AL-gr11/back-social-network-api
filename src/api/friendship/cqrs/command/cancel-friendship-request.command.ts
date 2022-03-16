import { User } from '../../../user/domain/entities/user.entity';

export class CancelFriendshipRequestCommand {
  constructor(public readonly sender: string, public readonly userId: string) {}
}
