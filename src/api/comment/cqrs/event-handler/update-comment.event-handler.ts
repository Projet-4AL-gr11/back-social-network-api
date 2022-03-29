import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { UpdateCommentEvent } from '../event/update-comment.event';

@EventsHandler(UpdateCommentEvent)
export class UpdateCommentEventHandler
  implements IEventHandler<UpdateCommentEvent>
{
  logger_console = new Logger('UpdateCommentEvent');

  handle(event: UpdateCommentEvent): any {
    logger.info(
      'Comment with id : ( ' + event.commentId + ' ) have been update',
    );

    this.logger_console.log(
      'Comment with id : ( ' + event.commentId + ' ) have been update',
    );
  }
}
