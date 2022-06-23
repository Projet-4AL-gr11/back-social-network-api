import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { DeleteJoinedConversationBySocketIdCommand } from '../../command/delete-joined-conversation-by-socket-id.command';
import { DeleteJoinedConversationBySocketIdEvent } from '../../event/delete-joined-conversation-by-socket-id.event';
import { JoinedConversation } from '../../../domain/entities/joined-conversation.entity';

@CommandHandler(DeleteJoinedConversationBySocketIdCommand)
export class DeleteJoinedConversationBySocketIdHandler
  implements ICommandHandler<DeleteJoinedConversationBySocketIdCommand>
{
  constructor(
    @InjectRepository(JoinedConversation)
    private readonly joinedConversationRepository: Repository<JoinedConversation>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: DeleteJoinedConversationBySocketIdCommand,
  ): Promise<void> {
    try {
      await this.joinedConversationRepository.delete({
        socketId: command.socketId,
      });

      this.eventBus.publish(
        new DeleteJoinedConversationBySocketIdEvent(command.socketId),
      );
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent(
          'DeleteJoinedConversationBySocketIdCommand',
          'Failed to delete connected User for ' + command.socketId,
        ),
      );
    }
  }
}
