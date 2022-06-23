import { User } from "../../../user/domain/entities/user.entity";

export class ConnectedUserDto {
  constructor(public user: User, public socketId: string) {}
}
