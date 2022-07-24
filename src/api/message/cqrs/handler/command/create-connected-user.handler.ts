import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CreateConnectedUserCommand } from '../../command/create-connected-user.command';
import { ConnectedUser } from '../../../domain/entities/connected-user.entity';
import { CreateConnectedUserEvent } from '../../event/create-connected-user.event';

@CommandHandler(CreateConnectedUserCommand)
export class CreateConnectedUserHandler
  implements ICommandHandler<CreateConnectedUserCommand>
{
  constructor(
    @InjectRepository(ConnectedUser)
    private readonly connectedUserRepository: Repository<ConnectedUser>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateConnectedUserCommand): Promise<ConnectedUser> {
    try {
      const newConnectedUser = await this.connectedUserRepository.create({
        user: command.user,
        socketId: command.socketId,
      });
      await this.connectedUserRepository.save(newConnectedUser);
      this.eventBus.publish(
        new CreateConnectedUserEvent(
          newConnectedUser.user.id,
          newConnectedUser.socketId,
        ),
      );
      return newConnectedUser;
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent(
          'CreateConnectedUserCommand',
          'Failed to create connected User for ' + command.user.id,
        ),
      );
    }
  }
}
