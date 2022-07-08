import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { DeleteJoinedConversationBySocketIdEvent } from '../event/delete-joined-conversation-by-socket-id.event';

@EventsHandler(DeleteJoinedConversationBySocketIdEvent)
export class DeleteJoinedConversationBySocketIdEventHandler
  implements IEventHandler<DeleteJoinedConversationBySocketIdEvent>
{
  logger_console = new Logger('DeleteJoinedConversationBySocketIdEvent');

  handle(event: DeleteJoinedConversationBySocketIdEvent): any {
    logger.info(
      'JoinedConversation with socket Id : ( ' +
        event.socketId +
        ' ) have been delete.',
    );

    this.logger_console.log(
      'JoinedConversation with socket Id : ( ' +
        event.socketId +
        ' ) have been delete.',
    );
  }
}
