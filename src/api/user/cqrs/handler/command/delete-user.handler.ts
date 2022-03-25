import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../../command/delete-user.command';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { DeleteUserEvent } from '../../event/delete-user.event';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  logger = new Logger('DeleteUserHandler');

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    public eventBus: EventBus,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    try {
      await this.userRepository.delete(command.userId);
      this.eventBus.publish(new DeleteUserEvent(command.userId));
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('DeleteUserHandler', error));
    }
  }
}
