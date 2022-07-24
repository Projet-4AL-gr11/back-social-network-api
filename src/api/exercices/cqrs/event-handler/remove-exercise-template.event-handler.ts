import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { RemoveExerciseTemplateEvent } from '../event/remove-exercise-template.event';

@EventsHandler(RemoveExerciseTemplateEvent)
export class RemoveExerciseTemplateEventHandler
  implements IEventHandler<RemoveExerciseTemplateEvent>
{
  logger_console = new Logger('RemoveExerciseTemplateEvent');

  handle(event: RemoveExerciseTemplateEvent): void {
    logger.info(
      'Exercise Template with id : ( ' + event.id + ' ) have been remove',
    );

    this.logger_console.log(
      'Exercise Template with id : ( ' + event.id + ' ) have been remove',
    );
  }
}
