import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { RemoveGroupFollowerEvent } from '../event/remove-group-follower.event';

@EventsHandler(RemoveGroupFollowerEvent)
export class RemoveGroupFollowEventHandler
  implements IEventHandler<RemoveGroupFollowerEvent>
{
  logger_console = new Logger('AddGroupFollowerEvent');

  handle(event: RemoveGroupFollowerEvent): void {
    logger.info(
      'User with id : ( ' +
        event.userId +
        ' ) stop to follow group with id : ( ' +
        event.groupId +
        ' )',
    );

    this.logger_console.log(
      'User with id : ( ' +
        event.userId +
        ' ) stop to follow group with id : ( ' +
        event.groupId +
        ' )',
    );
  }
}
