import { User } from '../../../user/domain/entities/user.entity';

export class CreateReportUserCommand {
  constructor(
    public readonly creator: User,
    public readonly user: User,
    public readonly text: string,
  ) {}
}
