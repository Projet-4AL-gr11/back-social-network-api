import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { AddCommentEvent } from '../event/add-comment.event';

@EventsHandler(AddCommentEvent)
export class AddCommentEventHandler implements IEventHandler<AddCommentEvent> {
  logger_console = new Logger('AddCommentEvent');

  handle(event: AddCommentEvent): any {
    logger.info(
      'User with id : ( ' +
        event.userId +
        ' ) had a comment with id : ( ' +
        event.commentId +
        ' ) to post with id : ( ' +
        event.postId +
        ' )',
    );

    this.logger_console.log(
      'User with id : ( ' +
        event.userId +
        ' ) had a comment with id : ( ' +
        event.commentId +
        ' ) to post with id : ( ' +
        event.postId +
        ' )',
    );
  }
}
