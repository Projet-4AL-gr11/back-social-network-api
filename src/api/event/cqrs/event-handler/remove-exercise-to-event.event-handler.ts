import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { RemoveExerciseToEventEvent } from '../event/remove-exercise-to-event.event';

@EventsHandler(RemoveExerciseToEventEvent)
export class RemoveExerciseToEventEventHandler
  implements IEventHandler<RemoveExerciseToEventEvent>
{
  logger_console = new Logger('RemoveExerciseToEventEvent');

  handle(event: RemoveExerciseToEventEvent): void {
    logger.info(
      'Exercise with id : ( ' +
        event.exerciseId +
        ' ) was remove from event with id : ( ' +
        event.eventId +
        ' )',
    );

    this.logger_console.log(
      'Exercise with id : ( ' +
        event.exerciseId +
        ' ) was remove from event with id : ( ' +
        event.eventId +
        ' )',
    );
  }
}
