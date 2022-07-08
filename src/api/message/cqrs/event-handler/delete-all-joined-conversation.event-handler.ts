import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { DeleteAllJoinedConversationEvent } from '../event/delete-all-joined-conversation.event';

@EventsHandler(DeleteAllJoinedConversationEvent)
export class DeleteAllJoinedConversationEventHandler
  implements IEventHandler<DeleteAllJoinedConversationEvent>
{
  logger_console = new Logger('DeleteAllJoinedConversationEvent');

  handle(event: DeleteAllJoinedConversationEvent): any {
    logger.info('JoinedConversation with id  have all been delete.');

    this.logger_console.log(
      'JoinedConversation with id  have all been delete.',
    );
  }
}
