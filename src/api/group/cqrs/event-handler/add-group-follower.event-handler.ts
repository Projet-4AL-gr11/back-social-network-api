import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { AddGroupFollowerEvent } from '../event/add-group-follower.event';

@EventsHandler(AddGroupFollowerEvent)
export class AddGroupFollowerEventHandler
  implements IEventHandler<AddGroupFollowerEvent>
{
  logger_console = new Logger('AddGroupFollowerEvent');

  handle(event: AddGroupFollowerEvent): void {
    logger.info(
      'User with id : ( ' +
        event.userId +
        ' ) now follow group with id : ( ' +
        event.groupId +
        ' )',
    );

    this.logger_console.log(
      'User with id : ( ' +
        event.userId +
        ' ) now follow group with id : ( ' +
        event.groupId +
        ' )',
    );
  }
}
