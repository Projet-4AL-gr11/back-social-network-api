import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CancelGroupRequestCommand } from '../../command/cancel-group-request.command';
import { GroupRequest } from '../../../domain/entities/group_request.entity';
import { CancelGroupRequestEvent } from '../../event/cancel-group-request.event';

@CommandHandler(CancelGroupRequestCommand)
export class CancelGroupRequestHandler
  implements ICommandHandler<CancelGroupRequestCommand>
{
  constructor(
    @InjectRepository(GroupRequest)
    private groupRequestRepository: Repository<GroupRequest>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CancelGroupRequestCommand): Promise<void> {
    try {
      const groupRequest: GroupRequest = await this.groupRequestRepository
        .createQueryBuilder()
        .leftJoinAndSelect('GroupRequest.user', 'User')
        .where('User.id=:userId', { userId: command.userId })
        .leftJoinAndSelect('GroupRequest.group', 'Group')
        .andWhere('Group.id=:groupId', { groupId: command.groupId })
        .getOne();
      this.eventBus.publish(
        new CancelGroupRequestEvent(command.groupId, command.userId),
      );
      await this.groupRequestRepository.remove(groupRequest);
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('CancelGroupRequestHandler', error),
      );

      //TODO: Envoyer une bonne erreur d'user
      throw error;
    }
  }
}
