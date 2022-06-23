import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateConnectedUserEvent } from '../event/create-connected-user.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { CreateJoinedConversationEvent } from '../event/create-joined-conversation.event';

@EventsHandler(CreateJoinedConversationEvent)
export class CreateJoinedConversationEventHandler
  implements IEventHandler<CreateJoinedConversationEvent>
{
  logger_console = new Logger('CreateJoinedConversationEvent');

  handle(event: CreateJoinedConversationEvent): any {
    logger.info(
      'User with id : ' +
        event.userId +
        ' joined-conversation with Id : ' +
        event.id,
    );

    this.logger_console.log(
      'User with id : ' +
        event.userId +
        ' joined-conversation with Id : ' +
        event.id,
    );
  }
}
