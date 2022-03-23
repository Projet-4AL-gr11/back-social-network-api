import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { SaveBannerPictureEvent } from '../event/save-banner-picture.event';

@EventsHandler(SaveBannerPictureEvent)
export class SaveBannerPictureEventHandler
  implements IEventHandler<SaveBannerPictureEvent>
{
  logger_console = new Logger('CreateMediaHandler');

  handle(event: SaveBannerPictureEvent): any {
    logger.info(
      'User with id ( ' +
        event.mediaDto.ownerId +
        ' ) upload new profile picture with name ' +
        event.mediaDto.fileName,
    );

    this.logger_console.log(
      'User with id ( ' +
        event.mediaDto.ownerId +
        ' ) upload new profile picture with name ' +
        event.mediaDto.fileName,
    );
  }
}
