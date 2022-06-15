import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { SendGroupRequestEvent } from '../event/send-group-request.event';

@EventsHandler(SendGroupRequestEvent)
export class SendGroupRequestEventHandler
  implements IEventHandler<SendGroupRequestEvent>
{
  logger_console = new Logger('SendGroupRequestEvent');

  handle(event: SendGroupRequestEvent): void {
    logger.info(
      'User with id : ( ' +
        event.userId +
        ' ) have been send a request for join group with id : ( ' +
        event.groupId +
        ' )',
    );

    this.logger_console.log(
      'User with id : ( ' +
        event.userId +
        ' ) have been send a request for join group with id : ( ' +
        event.groupId +
        ' )',
    );
  }
}
