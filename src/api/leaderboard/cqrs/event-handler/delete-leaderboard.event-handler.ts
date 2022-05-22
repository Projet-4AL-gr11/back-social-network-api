import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeleteLeaderboardEvent } from '../event/delete-leaderboard.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(DeleteLeaderboardEvent)
export class DeleteLeaderboardEventHandler
  implements IEventHandler<DeleteLeaderboardEvent>
{
  logger_console = new Logger('DeleteLeaderboardEvent');

  handle(event: DeleteLeaderboardEvent): any {
    logger.info('Leaderboard with id : ( ' + event.id + ' ) have been delete');

    this.logger_console.log(
      'Leaderboard with id : ( ' + event.id + ' ) have been delete',
    );
  }
}
