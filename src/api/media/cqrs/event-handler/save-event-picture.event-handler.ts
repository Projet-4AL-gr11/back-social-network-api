import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { SaveEventPictureEvent } from '../event/save-event-picture.event';

@EventsHandler(SaveEventPictureEvent)
export class SaveEventPictureEventHandler
  implements IEventHandler<SaveEventPictureEvent>
{
  logger_console = new Logger('CreateMediaHandler');

  handle(event: SaveEventPictureEvent): any {
    logger.info(
      'Event with id ( ' +
        event.mediaDto.ownerId +
        ' ) upload new picture with name ' +
        event.mediaDto.fileName,
    );

    this.logger_console.log(
      'Event with id ( ' +
        event.mediaDto.ownerId +
        ' ) upload new picture with name ' +
        event.mediaDto.fileName,
    );
  }
}
