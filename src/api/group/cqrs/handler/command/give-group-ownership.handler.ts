import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupMembership } from '../../../domain/entities/group_membership.entity';
import { GiveAdminRightEvent } from '../../event/give-admin-right.event';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { GiveGroupOwnershipCommand } from '../../command/give-group-ownership.command';

@CommandHandler(GiveGroupOwnershipCommand)
export class GiveGroupOwnershipHandler
  implements ICommandHandler<GiveGroupOwnershipCommand>
{
  constructor(
    @InjectRepository(GroupMembership)
    private groupMembershipRepository: Repository<GroupMembership>,
    private eventBus: EventBus,
  ) {}

  async execute(command: GiveGroupOwnershipCommand): Promise<void> {
    try {
      const groupMembershipOwner = await this.groupMembershipRepository
        .createQueryBuilder()
        .leftJoinAndSelect('GroupMembership.group', 'Group')
        .leftJoinAndSelect('GroupMembership.user', 'User')
        .where('Group.id=:groupId', { groupId: command.groupId })
        .andWhere('User.id=:userId', { userId: command.ownerId })
        .getOne();
      groupMembershipOwner.isOwner = false;
      groupMembershipOwner.isAdmin = true;
      await this.groupMembershipRepository.save(groupMembershipOwner);

      const groupMembershipUser = await this.groupMembershipRepository
        .createQueryBuilder()
        .leftJoinAndSelect('GroupMembership.group', 'Group')
        .leftJoinAndSelect('GroupMembership.user', 'User')
        .where('Group.id=:groupId', { groupId: command.groupId })
        .andWhere('User.id=:userId', { userId: command.userId })
        .getOne();
      groupMembershipUser.isAdmin = false;
      groupMembershipUser.isOwner = true;
      await this.groupMembershipRepository.save(groupMembershipUser);
      this.eventBus.publish(
        new GiveAdminRightEvent(command.userId, command.groupId),
      );
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('GiveGroupOwnershipCommand', error),
      );
      throw error;
    }
  }
}
