import { User } from '../../../user/domain/entities/user.entity';

export class CreateConnectedUserCommand {
  constructor(public readonly socketId: string, public readonly user: User) {}
}
