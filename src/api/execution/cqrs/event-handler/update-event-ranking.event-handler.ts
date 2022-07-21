import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { UpdateEventRankingEvent } from '../event/update-event-ranking.event';

@EventsHandler(UpdateEventRankingEvent)
export class UpdateEventRankingEventHandler
  implements IEventHandler<UpdateEventRankingEvent>
{
  logger_console = new Logger('UpdateEventRankingEvent');

  handle(event: UpdateEventRankingEvent): any {
    logger.info(
      'Leaderboard ranking for event with id : ( ' +
        event.eventId +
        ' ) have been update',
    );

    this.logger_console.log(
      'Leaderboard ranking for event with id : ( ' +
        event.eventId +
        ' ) have been update',
    );
  }
}
