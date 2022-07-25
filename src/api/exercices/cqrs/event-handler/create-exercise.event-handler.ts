import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { CreateExerciseEvent } from '../event/create-exercise.event';

@EventsHandler(CreateExerciseEvent)
export class CreateExerciseEventHandler
  implements IEventHandler<CreateExerciseEvent>
{
  logger_console = new Logger('CreateExerciseEvent');

  handle(event: CreateExerciseEvent): void {
    logger.info(
      'New Exercise with id : ( ' +
        event.name +
        ' )  for Event with id : ( ' +
        event.eventId +
        ' ) and exerciseTemplate with id : ( ' +
        event.exerciseTemplateId +
        ' ) have been create',
    );

    this.logger_console.log(
      'New Exercise with id : ( ' +
        event.name +
        ' )  for Event with id : ( ' +
        event.eventId +
        ' ) and exerciseTemplate with id : ( ' +
        event.exerciseTemplateId +
        ' ) have been create',
    );
  }
}
