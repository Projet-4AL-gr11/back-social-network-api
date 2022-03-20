import { ErrorEvent } from './error.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../config/winston-logger.config';

@EventsHandler(ErrorEvent)
export class ErrorEventHandler implements IEventHandler<ErrorEvent> {
  handle(event: ErrorEvent): any {
    const logger_console = new Logger(event.localisation);
    logger_console.error(event.error);

    logger.error(event);
  }
}
