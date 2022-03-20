import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AcceptFriendshipRequestEvent } from '../event/accept-friendship-request.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(AcceptFriendshipRequestEvent)
export class AcceptFriendshipRequestEventHandler
  implements IEventHandler<AcceptFriendshipRequestEvent>
{
  logger_console = new Logger('AcceptFriendshipRequest');

  handle(event: AcceptFriendshipRequestEvent): any {
    this.logger_console.log(
      'UserId ' + event.senderId + ' become friend with UserId ' + event.userId,
    );

    logger.info(
      'UserId ' + event.senderId + ' become friend with UserId ' + event.userId,
    );
  }
}
