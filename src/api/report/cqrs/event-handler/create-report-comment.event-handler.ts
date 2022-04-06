import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { CreateReportCommentEvent } from '../event/create-report-comment.event';

@EventsHandler(CreateReportCommentEvent)
export class CreateReportCommentEventHandler
  implements IEventHandler<CreateReportCommentEvent>
{
  logger_console = new Logger('CreateReportCommentEvent');

  handle(event: CreateReportCommentEvent): void {
    logger.info(
      'User with Id : ( ' +
        event.userId +
        ' ) create a new report with id : ( ' +
        event.reportId +
        ' ) for comment with id : (' +
        event.id +
        ' )',
    );

    this.logger_console.log(
      'User with Id : ( ' +
        event.userId +
        ' ) create a new report with id : ( ' +
        event.id +
        ' ) for comment with id : (' +
        event.id +
        ' )',
    );
  }
}
