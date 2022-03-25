import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { DeleteEventEvent } from '../event/delete-event.event';

@EventsHandler(DeleteEventEvent)
export class DeleteEventEventHandler
  implements IEventHandler<DeleteEventEvent>
{
  logger_console = new Logger('CreateEventHandler');

  handle(event: DeleteEventEvent): void {
    logger.info('Event with id : ( ' + event.id + ' ) have been delete');

    this.logger_console.log(
      'Event with id : ( ' + event.id + ' ) have been delete',
    );
  }
}
