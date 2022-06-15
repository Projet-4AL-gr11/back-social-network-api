import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { AcceptGroupRequestEvent } from '../event/accept-group-request.event';

@EventsHandler(AcceptGroupRequestEvent)
export class AcceptGroupRequestEventHandler
  implements IEventHandler<AcceptGroupRequestEvent>
{
  logger_console = new Logger('AcceptGroupRequestEvent');

  handle(event: AcceptGroupRequestEvent): void {
    logger.info(
      'User with id : ( ' +
        event.userId +
        ' ) accept request for group with id : ( ' +
        event.groupId +
        ' )',
    );

    this.logger_console.log(
      'User with id : ( ' +
        event.userId +
        ' ) accept request for group with id : ( ' +
        event.groupId +
        ' )',
    );
  }
}
