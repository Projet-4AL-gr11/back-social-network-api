import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedUser } from '../../../domain/entities/connected-user.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { DeleteAllConnectedUserCommand } from '../../command/delete-all-connected-user.command';

@CommandHandler(DeleteAllConnectedUserCommand)
export class DeleteAllConnectedUserHandler
  implements ICommandHandler<DeleteAllConnectedUserCommand>
{
  constructor(
    @InjectRepository(ConnectedUser)
    private readonly connectedUserRepository: Repository<ConnectedUser>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteAllConnectedUserCommand): Promise<void> {
    try {
      await this.connectedUserRepository
        .createQueryBuilder()
        .delete()
        .execute();
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent(
          'DeleteAllConnectedUserCommand',
          'Failed to delete all connected User for ',
        ),
      );
    }
  }
}
