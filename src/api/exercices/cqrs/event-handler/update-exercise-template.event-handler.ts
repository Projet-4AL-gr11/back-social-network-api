import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { UpdateExerciseTemplateEvent } from '../event/update-exercise-template.event';

@EventsHandler(UpdateExerciseTemplateEvent)
export class UpdateExerciseTemplateEventHandler
  implements IEventHandler<UpdateExerciseTemplateEvent>
{
  logger_console = new Logger('UpdateExerciseTemplateEvent');

  handle(event: UpdateExerciseTemplateEvent): void {
    logger.info(
      'Exercise Template with id : ( ' + event.id + ' ) have been updated',
    );

    this.logger_console.log(
      'Exercise Template with id : ( ' + event.id + ' ) have been updated',
    );
  }
}
