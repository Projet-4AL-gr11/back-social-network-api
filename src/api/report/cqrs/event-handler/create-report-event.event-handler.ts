import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { CreateReportEventEvent } from '../event/create-report-event.event';

@EventsHandler(CreateReportEventEvent)
export class CreateReportEventEventHandler
  implements IEventHandler<CreateReportEventEvent>
{
  logger_console = new Logger('CreateReportEventEvent');

  handle(event: CreateReportEventEvent): void {
    logger.info(
      'User with Id : ( ' +
        event.userId +
        ' ) create a new report with id : ( ' +
        event.reportId +
        ' ) for event with id : ( ' +
        event.id +
        ' )',
    );

    this.logger_console.log(
      'User with Id : ( ' +
        event.userId +
        ' ) create a new report with id : ( ' +
        event.reportId +
        ' ) for event with id : ( ' +
        event.id +
        ' )',
    );
  }
}
