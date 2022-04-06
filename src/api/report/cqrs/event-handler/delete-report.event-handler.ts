import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { DeleteReportEvent } from '../event/delete-report.event';

@EventsHandler(DeleteReportEvent)
export class DeleteReportEventHandler
  implements IEventHandler<DeleteReportEvent>
{
  logger_console = new Logger('DeleteReportEvent');

  handle(event: DeleteReportEvent): void {
    logger.info(
      'Report with Id : ( ' + event.reportId + ' ) have been deleted',
    );

    this.logger_console.log(
      'Report with Id : ( ' + event.reportId + ' ) have been deleted',
    );
  }
}
