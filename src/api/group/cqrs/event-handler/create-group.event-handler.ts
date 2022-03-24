import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateGroupEvent } from '../event/create-group.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(CreateGroupEvent)
export class CreateGroupEventHandler
  implements IEventHandler<CreateGroupEvent>
{
  logger_console = new Logger('CreateGroupHandler');

  handle(event: CreateGroupEvent): void {
    logger.info(
      'User with Id : ( ' +
        event.userId +
        ' ) create a new group with name : ( ' +
        event.groupName +
        ' )',
    );

    this.logger_console.log(
      'User with Id : ( ' +
        event.userId +
        ' ) create a new group with name : ( ' +
        event.groupName +
        ' )',
    );
  }
}
