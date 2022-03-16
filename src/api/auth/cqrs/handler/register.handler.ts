import { RegisterCommand } from '../command/register.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { validate } from 'class-validator';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  logger = new Logger('RegisterHandler');

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(command: RegisterCommand): Promise<User> {
    try {
      const newUser = new User();
      newUser.email = command.email;
      newUser.password = command.password;
      newUser.username = command.username;
      const err = await validate(newUser);
      if (err.length > 0) {
        throw err;
      }
      await this.userRepository.save(newUser);
      this.logger.verbose('New user have registered ' + newUser.username);
      delete newUser.password;
      return newUser;
    } catch (error) {
      this.logger.error('Failed to register account');
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }
}
