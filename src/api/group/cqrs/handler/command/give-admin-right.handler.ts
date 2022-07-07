import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../../../domain/entities/group.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { GiveAdminRightCommand } from '../../command/give-admin-right.command';
import { GroupMembership } from '../../../domain/entities/group_membership.entity';
import { GiveAdminRightEvent } from '../../event/give-admin-right.event';

@CommandHandler(GiveAdminRightCommand)
export class GiveAdminRightHandler
  implements ICommandHandler<GiveAdminRightCommand>
{
  constructor(
    @InjectRepository(GroupMembership)
    private groupMembershipRepository: Repository<GroupMembership>,
    private eventBus: EventBus,
  ) {}

  async execute(command: GiveAdminRightCommand): Promise<void> {
    try {
      const groupMembership = await this.groupMembershipRepository
        .createQueryBuilder()
        .leftJoinAndSelect('GroupMembership.group', 'Group')
        .leftJoinAndSelect('GroupMembership.user', 'User')
        .where('Group.id=:groupId', { groupId: command.groupId })
        .andWhere('User.id=:userId', { userId: command.userId })
        .getOne();
      groupMembership.isAdmin = true;
      await this.groupMembershipRepository.save(groupMembership);
      this.eventBus.publish(
        new GiveAdminRightEvent(command.userId, command.groupId),
      );
    } catch (error) {
      // TODO: return a vrai erreur
      this.eventBus.publish(new ErrorsEvent('GiveAdminRightCommand', error));
      throw error;
    }
  }
}
