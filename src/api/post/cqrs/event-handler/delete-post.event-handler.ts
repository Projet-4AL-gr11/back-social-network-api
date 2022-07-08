import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { DeletePostEvent } from '../event/delete-post.event';

@EventsHandler(DeletePostEvent)
export class DeletePostEventHandler implements IEventHandler<DeletePostEvent> {
  logger_console = new Logger('DeletePostEventHandler');

  handle(event: DeletePostEvent): any {
    logger.info(' Post  with id : ( ' + event.postId + ' ) have been deleted');
    this.logger_console.log(
      ' Post  with id : ( ' + event.postId + ' ) have been deleted',
    );
  }
}
