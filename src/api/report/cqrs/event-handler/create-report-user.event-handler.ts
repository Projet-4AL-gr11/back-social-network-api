import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CreateReportPostEvent } from "../event/create-report-post.event";
import { Logger } from "@nestjs/common";
import { logger } from "../../../../util/config/winston-logger.config";
import { CreateReportUserEvent } from "../event/create-report-user.event";

@EventsHandler(CreateReportUserEvent)
export class CreateReportUserEventHandler
  implements IEventHandler<CreateReportUserEvent>
{
  logger_console = new Logger('CreateReportUserEvent');

  handle(event: CreateReportUserEvent): void {
    logger.info(
      'User with Id : ( ' +
      event.userId +
      ' ) create a new report with id : ( ' +
      event.reportId +
      ' ) for user with id : ( ' +
      event.id +
      ' )',
    );

    this.logger_console.log(
      'User with Id : ( ' +
      event.userId +
      ' ) create a new report with id : ( ' +
      event.reportId +
      ' ) for user with id : ( ' +
      event.id +
      ' )',
    );
  }
}
