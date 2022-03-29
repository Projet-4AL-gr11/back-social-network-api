import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { CreatePostEvent } from '../event/create-post.event';

@EventsHandler(CreatePostEvent)
export class CreatePostEventHandler implements IEventHandler<CreatePostEvent> {
  logger_console = new Logger('CreatePostEventHandler');

  handle(event: CreatePostEvent): any {
    logger.info(
      'User with Id : ( ' +
        event.userId +
        ' ) create with post id : ( ' +
        event.postId +
        ' )',
    );
    this.logger_console.log(
      'User with Id : ( ' +
        event.userId +
        ' ) create with post id : ( ' +
        event.postId +
        ' )',
    );
  }
}
