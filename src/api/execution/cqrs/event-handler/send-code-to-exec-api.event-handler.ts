import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AddParticipantToEventEvent } from '../../../event/cqrs/event/add-participant-to-event.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { SendCodeToExecApiEvent } from '../event/send-code-to-exec-api.event';

@EventsHandler(SendCodeToExecApiEvent)
export class SendCodeToExecApiEventHandler
  implements IEventHandler<SendCodeToExecApiEvent>
{
  logger_console = new Logger('SendCodeToExecApiEventHandler');

  handle(event: SendCodeToExecApiEvent): void {
    logger.info(
      'User with id : ( ' +
        event.executeDto.userId +
        ' ) send execution request for exercise with id : ( ' +
        event.executeDto.exerciseId +
        ' )',
    );

    this.logger_console.log(
      'User with id : ( ' +
        event.executeDto.userId +
        ' ) send execution request for exercise with id : ( ' +
        event.executeDto.exerciseId +
        ' )',
    );
  }
}
