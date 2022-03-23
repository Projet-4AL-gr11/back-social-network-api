import { RegisterCommand } from '../command/register.command';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { validate } from 'class-validator';
import { InvalidClassException } from '@nestjs/core/errors/exceptions/invalid-class.exception';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';
import { RegisterEvent } from '../event/register.event';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventBus: EventBus,
  ) {}

  async execute(command: RegisterCommand): Promise<User> {
    try {
      const newUser = new User();
      newUser.email = command.email;
      newUser.password = command.password;
      newUser.username = command.username;
      const err = await validate(newUser);
      if (err.length > 0) {
        this.eventBus.publish(
          new ErrorsEvent('Register', 'Invalid parameters'),
        );
        throw new InvalidClassException('Parameter not validate');
      }
      await this.userRepository.save(newUser);
      this.eventBus.publish(new RegisterEvent(newUser.username));
      delete newUser.password;
      return newUser;
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('RegisterHandler', 'Failed to register account'),
      );
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }
}
