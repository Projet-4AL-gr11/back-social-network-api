import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async createUser(createUserDto: UserDto): Promise<User> {
    try {
      const newUser = new User();
      newUser.email = createUserDto.email;
      newUser.password = await this.hashPassword(createUserDto.password);
      newUser.username = createUserDto.username;
      const err = await validate(newUser);
      if (err.length > 0) {
        throw err;
      }
      await newUser.save();
      return newUser;
    } catch (error) {
      this.logger.error('Failed to register account');
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
