import { User } from '../../../user/domain/entities/user.entity';
import { Group } from '../../../group/domain/entities/group.entity';

export class CreateReportGroupCommand {
  constructor(
    public readonly creator: User,
    public readonly group: Group,
    public readonly text: string,
  ) {}
}
