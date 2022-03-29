import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { SavePostPictureEvent } from '../event/save-post-picture.event';

@EventsHandler(SavePostPictureEvent)
export class SavePostPictureEventHandler
  implements IEventHandler<SavePostPictureEvent>
{
  logger_console = new Logger('SavePostPictureEvent');

  handle(event: SavePostPictureEvent): any {
    logger.info(
      'User with id ( ' +
        event.mediaDto.ownerId +
        ' ) upload new post picture with name ' +
        event.mediaDto.fileName,
    );

    this.logger_console.log(
      'User with id ( ' +
        event.mediaDto.ownerId +
        ' ) upload new post picture with name ' +
        event.mediaDto.fileName,
    );
  }
}
