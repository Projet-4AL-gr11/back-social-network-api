import { ErrorsEvent } from './errorsEvent';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../config/winston-logger.config';

@EventsHandler(ErrorsEvent)
export class ErrorEventHandler implements IEventHandler<ErrorsEvent> {
  handle(event: ErrorsEvent): any {
    const logger_console = new Logger(event.localisation);
    logger_console.error(event.error);

    logger.error(event);
  }
}
