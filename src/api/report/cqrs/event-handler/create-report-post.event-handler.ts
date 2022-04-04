import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateReportGroupEvent } from '../event/create-report-group.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { CreateReportPostEvent } from '../event/create-report-post.event';

@EventsHandler(CreateReportPostEvent)
export class CreateReportPostEventHandler
  implements IEventHandler<CreateReportPostEvent>
{
  logger_console = new Logger('CreateReportPostEvent');

  handle(event: CreateReportPostEvent): void {
    logger.info(
      'User with Id : ( ' +
        event.userId +
        ' ) create a new report with id : ( ' +
        event.reportId +
        ' ) for post with id : ( ' +
        event.id +
        ' )',
    );

    this.logger_console.log(
      'User with Id : ( ' +
        event.userId +
        ' ) create a new report with id : ( ' +
        event.reportId +
        ' ) for post with id : ( ' +
        event.id +
        ' )',
    );
  }
}
