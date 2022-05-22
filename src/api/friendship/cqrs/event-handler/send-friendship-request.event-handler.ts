import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SendFriendshipRequestEvent } from '../event/send-friendship-request.event';
import { Logger } from '@nestjs/common';
import { AcceptFriendshipRequestEvent } from '../event/accept-friendship-request.event';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(SendFriendshipRequestEvent)
export class SendFriendshipRequestEventHandler
  implements IEventHandler<SendFriendshipRequestEvent>
{
  logger_console = new Logger('SendFriendshipRequest');

  handle(event: AcceptFriendshipRequestEvent): any {
    logger.info(
      'UserId ' +
        event.senderId +
        ' sent friendship request to UserId ' +
        event.userId,
    );
    this.logger_console.log(
      'UserId ' +
        event.senderId +
        ' sent friendship request to UserId ' +
        event.userId,
    );
  }
}
