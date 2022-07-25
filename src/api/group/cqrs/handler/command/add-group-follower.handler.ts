import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../../../domain/entities/group.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { AddGroupFollowerCommand } from '../../command/add-group-follower.command';
import { AddGroupFollowerEvent } from '../../event/add-group-follower.event';

@CommandHandler(AddGroupFollowerCommand)
export class AddGroupFollowerHandler
  implements ICommandHandler<AddGroupFollowerCommand>
{
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    private eventBus: EventBus,
  ) {}

  async execute(command: AddGroupFollowerCommand): Promise<void> {
    try {
      await this.groupRepository
        .createQueryBuilder()
        .relation('followers')
        .of(command.group)
        .add(command.user);
      this.eventBus.publish(
        new AddGroupFollowerEvent(command.user.id, command.group.id),
      );
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('AddGroupFollowerHandler', error));
      throw error;
    }
  }
}
