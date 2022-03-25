import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { UpdateEventEvent } from '../event/update-event.event';

@EventsHandler(UpdateEventEvent)
export class UpdateEventEventHandler
  implements IEventHandler<UpdateEventEvent>
{
  logger_console = new Logger('UpdateEventHandler');

  handle(event: UpdateEventEvent): void {
    logger.info('Event with id : ( ' + event.eventId + ' ) have been update');

    this.logger_console.log(
      'Event with id : ( ' + event.eventId + ' ) have been update',
    );
  }
}
