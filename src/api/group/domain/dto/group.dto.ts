import { User } from '../../../user/domain/entities/user.entity';

export class GroupDto {
  constructor(public readonly name: string, public readonly user: User) {}
}
