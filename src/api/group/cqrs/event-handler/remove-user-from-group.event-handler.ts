import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RemoveUserFromGroupEvent } from '../event/remove-user-from-group.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(RemoveUserFromGroupEvent)
export class RemoveUserFromGroupEventHandler
  implements IEventHandler<RemoveUserFromGroupEvent>
{
  logger_console = new Logger('RemoveUserFromGroupHandler');

  handle(event: RemoveUserFromGroupEvent): void {
    logger.info(
      'User with id : ( ' +
        event.userId +
        ' ) have been remove from group with id : ( ' +
        event.groupId +
        ' )',
    );

    this.logger_console.log(
      'User with id : ( ' +
        event.userId +
        ' ) have been remove from group with id : ( ' +
        event.groupId +
        ' )',
    );
  }
}
