import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CancelFriendshipRequestEvent } from '../event/cancel-friendship-request.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(CancelFriendshipRequestEvent)
export class CancelFriendshipRequestEventHandler
  implements IEventHandler<CancelFriendshipRequestEvent>
{
  logger_console = new Logger('CancelFriendshipRequest');

  handle(event: CancelFriendshipRequestEvent): any {
    logger.info(
      'UserId ' +
        event.senderId +
        ' cancel friendship-request to UserId ' +
        event.userId,
    );

    this.logger_console.log(
      'UserId ' +
        event.senderId +
        ' cancel friendship-request to UserId ' +
        event.userId,
    );
  }
}
