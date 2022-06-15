import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { CancelGroupRequestEvent } from '../event/cancel-group-request.event';

@EventsHandler(CancelGroupRequestEvent)
export class CancelGroupRequestEventHandler
  implements IEventHandler<CancelGroupRequestEvent>
{
  logger_console = new Logger('CancelGroupRequestEvent');

  handle(event: CancelGroupRequestEvent): void {
    logger.info(
      'User with id : ( ' +
        event.userId +
        ' ) cancel request for group with id : ( ' +
        event.groupId +
        ' )',
    );

    this.logger_console.log(
      'User with id : ( ' +
        event.userId +
        ' ) cancel request for group with id : ( ' +
        event.groupId +
        ' )',
    );
  }
}
