import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdateGroupEvent } from '../event/update-group.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(UpdateGroupEvent)
export class UpdateGroupEventHandler
  implements IEventHandler<UpdateGroupEvent>
{
  logger_console = new Logger('UpdateGroupEventHandler');

  handle(event: UpdateGroupEvent): any {
    logger.info('Group with id : ( ' + event.groupId + ' ) have been Updated');

    this.logger_console.log(
      'Group with id : ( ' + event.groupId + ' ) have been Updated',
    );
  }
}
