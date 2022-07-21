import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { SaveExecutionFileEvent } from '../event/save-execution-file.event';

@EventsHandler(SaveExecutionFileEvent)
export class SaveExecutionFileEventHandler
  implements IEventHandler<SaveExecutionFileEvent>
{
  logger_console = new Logger('SaveExecutionFileEvent');

  handle(event: SaveExecutionFileEvent): any {
    logger.info(
      'User with id ( ' +
        event.executionFileDto.ownerId +
        ' ) upload new execution file with name ' +
        event.executionFileDto.executionId,
    );

    this.logger_console.log(
      'User with id ( ' +
        event.executionFileDto.ownerId +
        ' ) upload new execution file with name ' +
        event.executionFileDto.executionId,
    );
  }
}
