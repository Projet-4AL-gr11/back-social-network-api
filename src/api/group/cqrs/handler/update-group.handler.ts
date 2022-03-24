import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateGroupCommand } from '../command/update-group.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../../domain/entities/group.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';
import { UpdateGroupEvent } from '../event/update-group.event';

@CommandHandler(UpdateGroupCommand)
export class UpdateGroupHandler implements ICommandHandler<UpdateGroupCommand> {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    private eventBus: EventBus,
  ) {}

  async execute(command: UpdateGroupCommand): Promise<void> {
    try {
      await this.groupRepository.update(command.groupId, command.groupDto);
      this.eventBus.publish(new UpdateGroupEvent(command.groupId));
    } catch (error) {
      // TODO: Retourner une vraie erreur
      this.eventBus.publish(new ErrorsEvent('UpdateGroupHandler', error));
      throw error;
    }
  }
}
