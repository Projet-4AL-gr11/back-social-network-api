import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletePictureEvent } from '../event/delete-picture.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(DeletePictureEvent)
export class DeletePictureEventHandler
  implements IEventHandler<DeletePictureEvent>
{
  logger_console = new Logger('DeletePictureEventHandler');

  handle(event: DeletePictureEvent): any {
    logger.info('Picture with id : ( ' + event.fileId + ' ) have been delete');

    this.logger_console.log(
      'Picture with id : ( ' + event.fileId + ' ) have been delete',
    );
  }
}
