import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { DeleteAllJoinedConversationCommand } from '../../command/delete-all-joined-conversation.command';
import { JoinedConversation } from '../../../domain/entities/joined-conversation.entity';
import { DeleteAllJoinedConversationEvent } from '../../event/delete-all-joined-conversation.event';

@CommandHandler(DeleteAllJoinedConversationCommand)
export class DeleteAllJoinedConversationHandler
  implements ICommandHandler<DeleteAllJoinedConversationCommand>
{
  constructor(
    @InjectRepository(JoinedConversation)
    private readonly joinedConversationRepository: Repository<JoinedConversation>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteAllJoinedConversationCommand): Promise<void> {
    try {
      await this.joinedConversationRepository
        .createQueryBuilder()
        .delete()
        .execute();
      this.eventBus.publish(new DeleteAllJoinedConversationEvent());
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent(
          'DeleteAllJoinedConversationCommand',
          'Failed to delete all joined Conversation ',
        ),
      );
    }
  }
}
