import { Group } from '../../domain/entities/group.entity';
import { User } from '../../../user/domain/entities/user.entity';

export class SendGroupRequestCommand {
  constructor(public readonly user: User, public readonly group: Group) {}
}
