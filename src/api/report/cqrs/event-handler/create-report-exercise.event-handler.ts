import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateReportEventEvent } from '../event/create-report-event.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { CreateReportExerciseEvent } from '../event/create-report-exercise.event';

@EventsHandler(CreateReportExerciseEvent)
export class CreateReportExerciseEventHandler
  implements IEventHandler<CreateReportExerciseEvent>
{
  logger_console = new Logger('CreateReportExerciseEvent');

  handle(event: CreateReportExerciseEvent): void {
    logger.info(
      'User with Id : ( ' +
        event.userId +
        ' ) create a new report with id : ( ' +
        event.reportId +
        ' ) for exercise with id : ( ' +
        event.id +
        ' )',
    );

    this.logger_console.log(
      'User with Id : ( ' +
        event.userId +
        ' ) create a new report with id : ( ' +
        event.reportId +
        ' ) for exercise with id : ( ' +
        event.id +
        ' )',
    );
  }
}
