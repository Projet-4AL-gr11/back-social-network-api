import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { SendGroupRequestCommand } from '../../command/send-group-request.command';
import { GroupRequest } from '../../../domain/entities/group_request.entity';
import { SendGroupRequestEvent } from '../../event/send-group-request.event';

@CommandHandler(SendGroupRequestCommand)
export class SendGroupRequestHandler
  implements ICommandHandler<SendGroupRequestCommand>
{
  constructor(
    @InjectRepository(GroupRequest)
    private groupRequestRepository: Repository<GroupRequest>,
    private eventBus: EventBus,
  ) {}

  async execute(command: SendGroupRequestCommand): Promise<GroupRequest> {
    try {
      const groupRequest = await this.groupRequestRepository.create({
        group: command.group,
        user: command.user,
      });
      this.eventBus.publish(
        new SendGroupRequestEvent(command.user.id, command.group.id),
      );
      return this.groupRequestRepository.save(groupRequest);
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('SendGroupRequestCommand', error));
      throw error;
    }
  }
}
