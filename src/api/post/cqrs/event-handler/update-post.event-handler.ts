import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatePostEvent } from '../event/create-post.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { UpdatePostEvent } from '../event/update-post.event';

@EventsHandler(UpdatePostEvent)
export class UpdatePostEventHandler implements IEventHandler<UpdatePostEvent> {
  logger_console = new Logger('UpdatePostEvent');

  handle(event: UpdatePostEvent): any {
    logger.info(' Update of post with id : ( ' + event.postId + ' )');
    this.logger_console.log(
      'Update of post with id : ( ' + event.postId + ' )',
    );
  }
}
