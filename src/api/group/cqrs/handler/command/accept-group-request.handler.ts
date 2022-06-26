import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AcceptFriendshipRequestCommand } from '../../../../friendship/cqrs/command/accept-friendship-request.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Friendship } from '../../../../friendship/domain/entities/friendship.entity';
import { Repository } from 'typeorm';
import { AcceptFriendshipRequestEvent } from '../../../../friendship/cqrs/event/accept-friendship-request.event';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { AcceptGroupRequestCommand } from '../../command/accept-group-request.command';
import { GroupMembership } from '../../../domain/entities/group_membership.entity';
import { AcceptGroupRequestEvent } from '../../event/accept-group-request.event';

@CommandHandler(AcceptGroupRequestCommand)
export class AcceptGroupRequestHandler
  implements ICommandHandler<AcceptGroupRequestCommand>
{
  constructor(
    @InjectRepository(GroupMembership)
    private groupMembershipRepository: Repository<GroupMembership>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: AcceptGroupRequestCommand): Promise<GroupMembership> {
    try {
      const groupMembership = this.groupMembershipRepository.create({
        group: command.group,
        user: command.user,
      });

      this.eventBus.publish(
        new AcceptGroupRequestEvent(command.group.id, command.user.id),
      );
      return this.groupMembershipRepository.save(groupMembership);
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('AcceptGroupRequestCommand', error),
      );
      //TODO: Envoyer une bonne erreur d'user
      throw error;
    }
  }
}
