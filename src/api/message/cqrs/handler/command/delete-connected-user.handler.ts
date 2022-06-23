import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateConnectedUserCommand } from '../../command/create-connected-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedUser } from '../../../domain/entities/connected-user.entity';
import { Repository } from 'typeorm';
import { SaveMessageEvent } from '../../event/save-message.event';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { DeleteConnectedUserCommand } from '../../command/delete-connected-user.command';
import { DeleteConnectedUserEvent } from '../../event/delete-connected-user.event';

@CommandHandler(DeleteConnectedUserCommand)
export class DeleteConnectedUserHandler
  implements ICommandHandler<DeleteConnectedUserCommand>
{
  constructor(
    @InjectRepository(ConnectedUser)
    private readonly connectedUserRepository: Repository<ConnectedUser>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteConnectedUserCommand): Promise<void> {
    try {
      this.connectedUserRepository.delete({
        socketId: command.id,
      });

      this.eventBus.publish(new DeleteConnectedUserEvent(command.id));
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent(
          'DeleteConnectedUserCommand',
          'Failed to delete connected User for ' + command.id,
        ),
      );
    }
  }
}
