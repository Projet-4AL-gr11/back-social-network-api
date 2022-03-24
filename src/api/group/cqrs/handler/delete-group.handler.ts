import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteGroupCommand } from '../command/delete-group.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../../domain/entities/group.entity';
import { Repository } from 'typeorm';
import { DeleteGroupEvent } from '../event/delete-group.event';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';

@CommandHandler(DeleteGroupCommand)
export class DeleteGroupHandler implements ICommandHandler<DeleteGroupCommand> {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    private eventBus: EventBus,
  ) {}

  async execute(command: DeleteGroupCommand): Promise<void> {
    try {
      await this.groupRepository.delete(command.groupId);
      this.eventBus.publish(new DeleteGroupEvent(command.groupId));
    } catch (error) {
      // TODO: return a vrai erreur
      this.eventBus.publish(new ErrorsEvent('DeleteGroupHandler', error));
      throw error;
    }
  }
}
