import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdateLanguageEvent } from '../event/update-language.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(UpdateLanguageEvent)
export class UpdateLanguageEventHandler
  implements IEventHandler<UpdateLanguageEvent>
{
  logger_console = new Logger('UpdateLanguageHandler');

  handle(event: UpdateLanguageEvent): void {
    logger.info('Language with id : ( ' + event.id + ' ) have been update');

    this.logger_console.log(
      'Language with id : ( ' + event.id + ' ) have been update',
    );
  }
}
