import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SaveMessageEvent } from '../event/save-message.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(SaveMessageEvent)
export class SaveMessageEventHandler
  implements IEventHandler<SaveMessageEvent>
{
  logger_console = new Logger('SaveMessage');

  handle(event: SaveMessageEvent): any {
    logger.info(
      'User with id : ' +
        event.authorId +
        ' send a new message : ' +
        event.content,
    );

    this.logger_console.log(
      'User with id : ' +
        event.authorId +
        ' send a new message : ' +
        event.content,
    );
  }
}
