import { GroupDto } from '../../domain/dto/group.dto';

export class UpdateGroupCommand {
  constructor(
    public readonly groupId: string,
    public readonly groupDto: GroupDto,
  ) {}
}
