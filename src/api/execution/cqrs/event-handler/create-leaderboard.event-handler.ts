import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateLeaderboardEvent } from '../event/create-leaderboard.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(CreateLeaderboardEvent)
export class CreateLeaderboardEventHandler
  implements IEventHandler<CreateLeaderboardEvent>
{
  logger_console = new Logger('CreateLeaderboardEvent');

  handle(event: CreateLeaderboardEvent): any {
    logger.info(
      'Leaderboard with id : ( ' +
        event.leaderboardId +
        ' ) have been create for User with id: ( ' +
        event.userId +
        ' ) for exercise with id : ( ' +
        event.exerciseId +
        ' ) with executionId : ( ' +
        event.executionId +
        ' )',
    );

    this.logger_console.log(
      'Leaderboard with id : ( ' +
        event.leaderboardId +
        ' ) have been create for User with id: ( ' +
        event.userId +
        ' ) for exercise with id : ( ' +
        event.exerciseId +
        ' ) with executionId : ( ' +
        event.executionId +
        ' )',
    );
  }
}
