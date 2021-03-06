import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RemoveUserFromGroupCommand } from '../../command/remove-user-from-group.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupMembership } from '../../../domain/entities/group_membership.entity';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { Group } from '../../../domain/entities/group.entity';
import { RemoveUserFromGroupEvent } from '../../event/remove-user-from-group.event';

@CommandHandler(RemoveUserFromGroupCommand)
export class RemoveUserFromGroupHandler
  implements ICommandHandler<RemoveUserFromGroupCommand>
{
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(GroupMembership)
    private groupMembershipRepository: Repository<GroupMembership>,
    private eventBus: EventBus,
  ) {}

  async execute(command: RemoveUserFromGroupCommand): Promise<any> {
    try {
      await this.groupMembershipRepository.remove(
        await this.groupMembershipRepository
          .createQueryBuilder()
          .leftJoinAndSelect('GroupMembership.user', 'User')
          .leftJoinAndSelect('GroupMembership.group', 'Group')
          .where('User.id=:userId', { userId: command.userId })
          .andWhere('Group.id=:groupId', { groupId: command.groupId })
          .getOne(),
      );
      const membersCount = await this.groupMembershipRepository
        .createQueryBuilder()
        .leftJoin('GroupMembership.group', 'Group')
        .where('Group.id=:groupId', { groupId: command.groupId })
        .getCount();
      if (membersCount <= 1) {
        await this.groupRepository.delete(command.groupId);
      }
      this.eventBus.publish(
        new RemoveUserFromGroupEvent(command.userId, command.groupId),
      );
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('RemoveUserFromGroupHandler', error),
      );
      throw error;
    }
  }
}
