import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { User } from '../../../domain/entities/user.entity';
import { BlockUserCommand } from '../../command/block-user.command';
import { BlockUserEvent } from '../../event/block-user.event';

@CommandHandler(BlockUserCommand)
export class BlockUserHandler implements ICommandHandler<BlockUserCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventBus: EventBus,
  ) {}

  async execute(command: BlockUserCommand): Promise<void> {
    try {
      await this.userRepository
        .createQueryBuilder()
        .relation('blockedUsers')
        .of(command.currentUserId)
        .add(command.userId);
      this.eventBus.publish(
        new BlockUserEvent(command.currentUserId, command.userId),
      );
    } catch (error) {
      // TODO: return a vrai erreur
      this.eventBus.publish(new ErrorsEvent('BlockUserHandler', error));
      throw error;
    }
  }
}
