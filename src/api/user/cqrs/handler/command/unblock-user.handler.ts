import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { UnblockUserCommand } from '../../command/unblock-user.command';
import { UnblockUserEvent } from '../../event/unblock-user.event';

@CommandHandler(UnblockUserCommand)
export class UnblockUserHandler implements ICommandHandler<UnblockUserCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventBus: EventBus,
  ) {}

  async execute(command: UnblockUserCommand): Promise<void> {
    try {
      await this.userRepository
        .createQueryBuilder()
        .relation('blockedUsers')
        .of(command.currentUserId)
        .remove(command.userId);
      this.eventBus.publish(
        new UnblockUserEvent(command.currentUserId, command.userId),
      );
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('UnblockUserCommand', error));
      throw error;
    }
  }
}
