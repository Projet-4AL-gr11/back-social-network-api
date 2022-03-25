import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { AddParticipantToEventEvent } from '../event/add-participant-to-event.event';

@EventsHandler(AddParticipantToEventEvent)
export class AddParticipantToEventEventHandler
  implements IEventHandler<AddParticipantToEventEvent>
{
  logger_console = new Logger('AddParticipantToEventHandler');

  handle(event: AddParticipantToEventEvent): void {
    logger.info(
      'User with id : ( ' +
        event.userId +
        ' ) join event with id : ( ' +
        event.eventId +
        ' )',
    );

    this.logger_console.log(
      'User with id : ( ' +
        event.userId +
        ' ) join event with id : ( ' +
        event.eventId +
        ' )',
    );
  }
}
