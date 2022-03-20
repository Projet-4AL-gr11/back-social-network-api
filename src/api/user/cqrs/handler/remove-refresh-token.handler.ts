import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RemoveRefreshTokenCommand } from '../command/remove-refresh-token.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';

@CommandHandler(RemoveRefreshTokenCommand)
export class RemoveRefreshTokenHandler
  implements ICommandHandler<RemoveRefreshTokenCommand>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventBus: EventBus,
  ) {}

  async execute(command: RemoveRefreshTokenCommand): Promise<void> {
    try {
      await this.userRepository.update(command.userId, {
        currentHashedRefreshToken: null,
      });
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('RemoveRefreshTokenHandler', error),
      );
    }
  }
}
