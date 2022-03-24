import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateGroupCommand } from '../command/create-group.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../../domain/entities/group.entity';
import { getRepository, Repository } from 'typeorm';
import { GroupMembership } from '../../domain/entities/group_membership.entity';
import { validate } from 'class-validator';
import { CreateGroupEvent } from '../event/create-group.event';

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
        user: command.user,
      });
      group.members = command.groupDto.users.map((user) =>
        this.groupMembershipRepository.create({ user }),
      );
      group.members.push(creatorMembership);
      const err = await validate(group);
      if (err.length > 0) {
        throw err;
      }
      this.eventBus.publish(new CreateGroupEvent(command.user.id, group.name));
      return await this.groupRepository.save(group);
    } catch (error) {
      //TODO: Faire une vraie erreur
      this.eventBus.publish(new ErrorEvent('CreateGroupHandler', error));
      throw error;
    }
  }
}
