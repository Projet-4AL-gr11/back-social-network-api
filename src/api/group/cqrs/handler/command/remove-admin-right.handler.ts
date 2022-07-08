import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupMembership } from '../../../domain/entities/group_membership.entity';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { RemoveAdminRightEvent } from '../../event/remove-admin-right.event';
import { RemoveAdminRightCommand } from '../../command/remove-admin-right.command';

@CommandHandler(RemoveAdminRightCommand)
export class RemoveAdminRightHandler
  implements ICommandHandler<RemoveAdminRightCommand>
{
  constructor(
    @InjectRepository(GroupMembership)
    private groupMembershipRepository: Repository<GroupMembership>,
    private eventBus: EventBus,
  ) {}

  async execute(command: RemoveAdminRightCommand): Promise<void> {
    try {
      const groupMembership = await this.groupMembershipRepository
        .createQueryBuilder()
        .leftJoinAndSelect('GroupMembership.group', 'Group')
        .leftJoinAndSelect('GroupMembership.user', 'User')
        .where('Group.id=:groupId', { groupId: command.groupId })
        .andWhere('User.id=:userId', { userId: command.userId })
        .getOne();
      groupMembership.isAdmin = false;
      await this.groupMembershipRepository.save(groupMembership);
      this.eventBus.publish(
        new RemoveAdminRightEvent(command.userId, command.groupId),
      );
    } catch (error) {
      // TODO: return a vrai erreur
      this.eventBus.publish(new ErrorsEvent('RemoveAdminRightCommand', error));
      throw error;
    }
  }
}
