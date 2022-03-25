import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { CreateEventEvent } from '../event/create-event.event';

@EventsHandler(CreateEventEvent)
export class CreateEventEventHandler
  implements IEventHandler<CreateEventEvent>
{
  logger_console = new Logger('CreateEventHandler');

  handle(event: CreateEventEvent): void {
    logger.info(
      'New Event with id : ( ' + event.eventId + ' ) have been create',
    );

    this.logger_console.log(
      'New Event with id : ( ' + event.eventId + ' ) have been create',
    );
  }
}
