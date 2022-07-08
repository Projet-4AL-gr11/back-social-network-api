import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { CreateReportGroupEvent } from '../event/create-report-group.event';

@EventsHandler(CreateReportGroupEvent)
export class CreateReportGroupEventHandler
  implements IEventHandler<CreateReportGroupEvent>
{
  logger_console = new Logger('CreateReportGroupEvent');

  handle(event: CreateReportGroupEvent): void {
    logger.info(
      'User with Id : ( ' +
        event.userId +
        ' ) create a new report with id : ( ' +
        event.reportId +
        ' ) for group with id : ( ' +
        event.id +
        ' )',
    );

    this.logger_console.log(
      'User with Id : ( ' +
        event.userId +
        ' ) create a new report with id : ( ' +
        event.reportId +
        ' ) for group with id : ( ' +
        event.id +
        ' )',
    );
  }
}
