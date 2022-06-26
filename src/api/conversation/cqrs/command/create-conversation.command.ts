import { User } from '../../../user/domain/entities/user.entity';

export class CreateConversationCommand {
  constructor(public readonly userList: User[]) {}
}
