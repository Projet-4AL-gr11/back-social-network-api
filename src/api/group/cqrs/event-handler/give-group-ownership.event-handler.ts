import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { GiveAdminRightEvent } from '../event/give-admin-right.event';
import { GiveGroupOwnershipEvent } from '../event/give-group-ownership.event';

@EventsHandler(GiveGroupOwnershipEvent)
export class GiveGroupOwnershipEventHandler
  implements IEventHandler<GiveGroupOwnershipEvent>
{
  logger_console = new Logger('GiveGroupOwnershipEvent');

  handle(event: GiveGroupOwnershipEvent): void {
    logger.info(
      'User with id : ( ' +
        event.ownerId +
        ' ) give ownership of group with id : ( ' +
        event.groupId +
        ' ) to user with id : ( ' +
        event.userId +
        ' )',
    );

    this.logger_console.log(
      'User with id : ( ' +
        event.ownerId +
        ' ) give ownership of group with id : ( ' +
        event.groupId +
        ' ) to user with id : ( ' +
        event.userId +
        ' )',
    );
  }
}
