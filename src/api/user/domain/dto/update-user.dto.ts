import { UserDto } from './user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(UserDto) {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(5, 20)
  @IsNotEmpty()
  username: string;

  password?: string;

  bio?: string;
}
