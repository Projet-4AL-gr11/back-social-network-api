import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatePostEvent } from '../event/create-post.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { UpdatePostEvent } from '../event/update-post.event';

@EventsHandler(UpdatePostEvent)
export class UpdatePostEventHandler implements IEventHandler<UpdatePostEvent> {
  logger_console = new Logger('UpdatePostEvent');

  handle(event: UpdatePostEvent): any {
    logger.info(
      'User with Id : ( ' +
        event.userId +
        ' ) update with post id : ( ' +
        event.postId +
        ' )',
    );
    this.logger_console.log(
      'User with Id : ( ' +
        event.userId +
        ' ) update with post id : ( ' +
        event.postId +
        ' )',
    );
  }
}
