import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../command/update-user.command';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { validate } from 'class-validator';
import { InvalidClassException } from '@nestjs/core/errors/exceptions/invalid-class.exception';
import { UserResponse } from '../../domain/response/user.response';
import { UpdateUserEvent } from '../event/update-user.event';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  logger = new Logger('UpdateUser');

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    public eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<UserResponse> {
    try {
      const err = await validate(UpdateUserCommand);
      if (err.length > 0) {
        this.logger.error('Invalid parameters');
        throw new InvalidClassException('Parameter not validate');
      }
      await this.userRepository.update(command.userId, command.user);
      const user: User = await this.userRepository.findOneOrFail(
        command.userId,
      );
      this.eventBus.publish(new UpdateUserEvent(command.userId));
      return new UserResponse(
        user.id,
        user.username,
        user.email,
        user.userType,
      );
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('UpdateUserHandler', error));
      throw error;
    }
  }
}
