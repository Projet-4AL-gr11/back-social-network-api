import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { CreateExerciseTemplateEvent } from '../event/create-exercise-template.event';

@EventsHandler(CreateExerciseTemplateEvent)
export class CreateExerciseTemplateEventHandler
  implements IEventHandler<CreateExerciseTemplateEvent>
{
  logger_console = new Logger('CreateExerciseTemplateEvent');

  handle(event: CreateExerciseTemplateEvent): void {
    logger.info(
      'New Exercise Template with id : ( ' + event.id + ' ) have been create',
    );

    this.logger_console.log(
      'New Exercise Template with id : ( ' + event.id + ' ) have been create',
    );
  }
}
