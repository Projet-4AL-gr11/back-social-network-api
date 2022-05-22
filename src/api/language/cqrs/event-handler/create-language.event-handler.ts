import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateLanguageEvent } from '../event/create-language.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(CreateLanguageEvent)
export class CreateLanguageEventHandler
  implements IEventHandler<CreateLanguageEvent>
{
  logger_console = new Logger('CreateLanguageHandler');

  handle(event: CreateLanguageEvent): void {
    logger.info('New language : ( ' + event.name + ' ) have been create');

    this.logger_console.log(
      'New language : ( ' + event.name + ' ) have been create',
    );
  }
}
