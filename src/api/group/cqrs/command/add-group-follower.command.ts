import { User } from '../../../user/domain/entities/user.entity';
import { Group } from '../../domain/entities/group.entity';

export class AddGroupFollowerCommand {
  constructor(public readonly user: User, public readonly group: Group) {}
}
