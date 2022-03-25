import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeleteLanguageEvent } from '../event/delete-language.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(DeleteLanguageEvent)
export class DeleteLanguageEventHandler
  implements IEventHandler<DeleteLanguageEvent>
{
  logger_console = new Logger('DeleteLanguageHandler');

  handle(event: DeleteLanguageEvent): void {
    logger.info('Language with id : ( ' + event.id + ' ) have been delete');

    this.logger_console.log(
      'Language with id : ( ' + event.id + ' ) have been delete',
    );
  }
}
