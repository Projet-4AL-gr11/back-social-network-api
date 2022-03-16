import { UserType } from '../enum/user-type.enum';

export class UserResponse {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly userType: UserType,
  ) {}
}
