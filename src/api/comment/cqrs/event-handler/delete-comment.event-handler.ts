import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { DeleteCommentEvent } from '../event/delete-comment.event';

@EventsHandler(DeleteCommentEvent)
export class DeleteCommentEventHandler
  implements IEventHandler<DeleteCommentEvent>
{
  logger_console = new Logger('DeleteCommentEvent');

  handle(event: DeleteCommentEvent): any {
    logger.info(
      'Comment with id : ( ' + event.commentId + ' ) have been delete',
    );

    this.logger_console.log(
      'Comment with id : ( ' + event.commentId + ' ) have been delete',
    );
  }
}
