import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { RemoveAdminRightEvent } from '../event/remove-admin-right.event';

@EventsHandler(RemoveAdminRightEvent)
export class RemoveAdminRightEventHandler
  implements IEventHandler<RemoveAdminRightEvent>
{
  logger_console = new Logger('RemoveAdminRightEvent');

  handle(event: RemoveAdminRightEvent): void {
    logger.info(
      'User with id : ( ' +
        event.userId +
        ' ) now more admin of group with id : ( ' +
        event.groupId +
        ' )',
    );

    this.logger_console.log(
      'User with id : ( ' +
        event.userId +
        ' ) now more admin of group with id : ( ' +
        event.groupId +
        ' )',
    );
  }
}
