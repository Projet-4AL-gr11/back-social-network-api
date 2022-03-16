import { User } from '../../../user/domain/entities/user.entity';

export class SendFriendshipRequestCommand {
  constructor(public readonly sender: User, public readonly userId: string) {}
}
