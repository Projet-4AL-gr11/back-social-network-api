import { UserDto } from './user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(UserDto) {
  email: string;
  password: string;
}
