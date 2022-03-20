import { User } from '../../../user/domain/entities/user.entity';

export class RegisterEvent {
  constructor(public readonly user: User) {}
}
