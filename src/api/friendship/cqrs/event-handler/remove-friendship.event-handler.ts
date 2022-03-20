import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RemoveFriendshipEvent } from '../event/remove-friendship.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(RemoveFriendshipEvent)
export class RemoveFriendshipEventHandler
  implements IEventHandler<RemoveFriendshipEvent>
{
  logger_console = new Logger('RemoveFriendship');

  handle(event: RemoveFriendshipEvent): any {
    logger.info(
      'UserId ' +
        event.senderId +
        ' remove friendship request with UserId ' +
        event.userId,
    );
    this.logger_console.log(
      'UserId ' +
        event.senderId +
        ' remove friendship request with UserId ' +
        event.userId,
    );
  }
}
