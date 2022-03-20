import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SetCurrentRefreshTokenCommand } from '../command/set-current-refresh-token.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';
import * as bcrypt from 'bcrypt';

@CommandHandler(SetCurrentRefreshTokenCommand)
export class SetCurrentRefreshTokenHandler
  implements ICommandHandler<SetCurrentRefreshTokenCommand>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventBus: EventBus,
  ) {}

  async execute(command: SetCurrentRefreshTokenCommand): Promise<any> {
    try {
      const currentHashedRefreshToken = await bcrypt.hash(
        command.refreshToken,
        10,
      );
      await this.userRepository.update(command.userId, {
        currentHashedRefreshToken,
      });
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('SetCurrentRefreshTokenHandler', error),
      );
    }
  }
}
