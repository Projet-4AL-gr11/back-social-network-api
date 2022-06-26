import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { CreateConversationEvent } from '../event/create-conversation.event';

@EventsHandler(CreateConversationEvent)
export class CreateConversationEventHandler
  implements IEventHandler<CreateConversationEvent>
{
  logger_console = new Logger('CreateConversationEvent');

  handle(event: CreateConversationEvent): any {
    logger.info(
      'Users with id : ( ' +
        event.userList.values() +
        ' ) join the new conversation with id : ( ' +
        event.conversationId +
        ' )',
    );

    this.logger_console.log(
      'Users with id : ( ' +
        event.userList.toString() +
        ' ) join the new conversation with id : ( ' +
        event.conversationId +
        ' )',
    );
  }
}
