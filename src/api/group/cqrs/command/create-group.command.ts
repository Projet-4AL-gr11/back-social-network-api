import { User } from '../../../user/domain/entities/user.entity';
import { GroupDto } from '../../domain/dto/group.dto';

export class CreateGroupCommand {
  constructor(public readonly user: User, public readonly groupDto: GroupDto) {}
}
