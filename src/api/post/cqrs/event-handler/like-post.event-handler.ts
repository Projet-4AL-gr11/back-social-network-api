import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { LikePostEvent } from '../event/like-post.event';

@EventsHandler(LikePostEvent)
export class LikePostEventHandler implements IEventHandler<LikePostEvent> {
  logger_console = new Logger('LikePostEvent');

  handle(event: LikePostEvent): any {
    logger.info(
      'User with Id : ( ' +
        event.userId +
        ' ) like with post id : ( ' +
        event.postId +
        ' )',
    );
    this.logger_console.log(
      'User with Id : ( ' +
        event.userId +
        ' ) like with post id : ( ' +
        event.postId +
        ' )',
    );
  }
}
