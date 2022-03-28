import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { AddExerciseToEventEvent } from '../event/add-exercise-to-event.event';

@EventsHandler(AddExerciseToEventEvent)
export class AddExerciseToEventEventHandler
  implements IEventHandler<AddExerciseToEventEvent>
{
  logger_console = new Logger('AddExerciseToEventEventHandler');

  handle(event: AddExerciseToEventEvent): void {
    logger.info(
      'Exercise with id : ( ' +
        event.exerciseId +
        ' ) add to event with id : ( ' +
        event.eventId +
        ' )',
    );

    this.logger_console.log(
      'Exercise with id : ( ' +
        event.exerciseId +
        ' ) add to event with id : ( ' +
        event.eventId +
        ' )',
    );
  }
}
