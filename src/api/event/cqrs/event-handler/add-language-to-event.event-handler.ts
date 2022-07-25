import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { AddLanguageToEventEvent } from '../event/add-language-to-event.event';

@EventsHandler(AddLanguageToEventEvent)
export class AddLanguageToEventEventHandler
  implements IEventHandler<AddLanguageToEventEvent>
{
  logger_console = new Logger('AddLanguageToEventEvent');

  handle(event: AddLanguageToEventEvent): void {
    logger.info(
      'Language with id : ( ' +
        event.languageId +
        ' ) add to event with id : ( ' +
        event.eventId +
        ' )',
    );

    this.logger_console.log(
      'Language with id : ( ' +
        event.languageId +
        ' ) add to event with id : ( ' +
        event.eventId +
        ' )',
    );
  }
}
