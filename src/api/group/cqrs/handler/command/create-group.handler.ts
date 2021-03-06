import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateGroupCommand } from '../../command/create-group.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../../../domain/entities/group.entity';
import { Repository } from 'typeorm';
import { GroupMembership } from '../../../domain/entities/group_membership.entity';
import { validate } from 'class-validator';
import { CreateGroupEvent } from '../../event/create-group.event';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';

@CommandHandler(CreateGroupCommand)
export class CreateGroupHandler implements ICommandHandler<CreateGroupCommand> {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(GroupMembership)
    private groupMembershipRepository: Repository<GroupMembership>,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateGroupCommand): Promise<Group> {
    try {
      const group = this.groupRepository.create({ ...command.groupDto });
      const creatorMembership = this.groupMembershipRepository.create({
        isOwner: true,
        user: command.user,
      });
      group.members = [].concat(creatorMembership);
      const err = await validate(group);
      if (err.length > 0) {
        throw err;
      }
      this.eventBus.publish(new CreateGroupEvent(command.user.id, group.name));
      return await this.groupRepository.save(group);
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('CreateGroupHandler', error));
      throw error;
    }
  }
}
