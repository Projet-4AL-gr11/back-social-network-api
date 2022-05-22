import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeleteGroupEvent } from '../event/delete-group.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(DeleteGroupEvent)
export class DeleteGroupEventHandler
  implements IEventHandler<DeleteGroupEvent>
{
  logger_console = new Logger('DeleteGroupHandler');

  handle(event: DeleteGroupEvent): void {
    logger.info('Group with Id : ( ' + event.groupId + ' ) have been deleted');

    this.logger_console.log(
      'Group with Id : ( ' + event.groupId + ' ) have been deleted',
    );
  }
}
