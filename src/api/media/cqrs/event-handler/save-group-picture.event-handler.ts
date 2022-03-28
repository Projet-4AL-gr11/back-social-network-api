import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { SaveGroupPictureEvent } from '../event/save-group-picture.event';

@EventsHandler(SaveGroupPictureEvent)
export class SaveGroupPictureEventHandler
  implements IEventHandler<SaveGroupPictureEvent>
{
  logger_console = new Logger('CreateMediaHandler');

  handle(event: SaveGroupPictureEvent): any {
    logger.info(
      'Group with id ( ' +
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
