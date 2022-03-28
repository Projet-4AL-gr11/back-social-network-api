import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { RemoveParticipantToEventEvent } from '../event/remove-participant-to-event.event';

@EventsHandler(RemoveParticipantToEventEvent)
export class RemoveParticipantToEventEventHandler
  implements IEventHandler<RemoveParticipantToEventEvent>
{
  logger_console = new Logger('RemoveParticipantToEventHandler');

  handle(event: RemoveParticipantToEventEvent): void {
    logger.info(
      'User with id : ( ' +
        event.userId +
        ' ) was remove from event with id : ( ' +
        event.eventId +
        ' )',
    );

    this.logger_console.log(
      'User with id : ( ' +
        event.userId +
        ' ) was remove from event with id : ( ' +
        event.eventId +
        ' )',
    );
  }
}
