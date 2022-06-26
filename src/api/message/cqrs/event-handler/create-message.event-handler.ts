import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateJoinedConversationEvent } from '../event/create-joined-conversation.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { CreateMessageEvent } from '../event/create-message.event';

@EventsHandler(CreateMessageEvent)
export class CreateMessageEventHandler
  implements IEventHandler<CreateMessageEvent>
{
  logger_console = new Logger('CreateMessageEvent');

  handle(event: CreateMessageEvent): any {
    logger.info(
      'User with id : ' +
        event.userId +
        ' create message with Id : ' +
        event.messageId +
        ' at conversation with Id : ' +
        event.conversationId,
    );

    this.logger_console.log(
      'User with id : ' +
        event.userId +
        ' create message with Id : ' +
        event.messageId +
        ' at conversation with Id : ' +
        event.conversationId,
    );
  }
}
