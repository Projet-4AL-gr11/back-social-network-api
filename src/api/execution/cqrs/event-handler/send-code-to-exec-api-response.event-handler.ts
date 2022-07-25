import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SendCodeToExecApiEvent } from '../event/send-code-to-exec-api.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { SendCodeToExecApiResponseEvent } from '../event/send-code-to-exec-api-response.event';

@EventsHandler(SendCodeToExecApiResponseEvent)
export class SendCodeToExecApiResponseEventHandler
  implements IEventHandler<SendCodeToExecApiResponseEvent>
{
  logger_console = new Logger('SendCodeToExecApiResponseEvent');

  handle(event: SendCodeToExecApiResponseEvent): void {
    logger.info(
      'User with id : ( ' +
        event.userId +
        ' ) receive a response for his execution request with id : ( ' +
        event.result +
        ' )',
    );

    logger.info(
      'User with id : ( ' +
        event.userId +
        ' ) receive a response for his execution request with id : ( ' +
        event.result +
        ' )',
    );
  }
}
