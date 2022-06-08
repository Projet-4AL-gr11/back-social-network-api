import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { GiveAdminRightEvent } from '../event/give-admin-right.event';

@EventsHandler(GiveAdminRightEvent)
export class GiveAdminRightEventHandler
  implements IEventHandler<GiveAdminRightEvent>
{
  logger_console = new Logger('GiveAdminRightEvent');

  handle(event: GiveAdminRightEvent): void {
    logger.info(
      'User with id : ( ' +
        event.userId +
        ' ) now admin of group with id : ( ' +
        event.groupId +
        ' )',
    );

    this.logger_console.log(
      'User with id : ( ' +
        event.userId +
        ' ) now admin of group with id : ( ' +
        event.groupId +
        ' )',
    );
  }
}
