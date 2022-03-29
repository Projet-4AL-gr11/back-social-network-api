import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { DislikePostEvent } from '../event/dislike-post.event';

@EventsHandler(DislikePostEvent)
export class DislikePostEventHandler
  implements IEventHandler<DislikePostEvent>
{
  logger_console = new Logger('DislikePostEventHandler');

  handle(event: DislikePostEvent): any {
    logger.info(
      'User with Id : ( ' +
        event.userId +
        ' ) dislike with post id : ( ' +
        event.postId +
        ' )',
    );
    this.logger_console.log(
      'User with Id : ( ' +
        event.userId +
        ' ) dislike with post id : ( ' +
        event.postId +
        ' )',
    );
  }
}
