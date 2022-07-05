import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SaveGroupPictureEvent } from '../event/save-group-picture.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { SaveGroupBannerPictureEvent } from '../event/save-group-banner-picture.event';

@EventsHandler(SaveGroupBannerPictureEvent)
export class SaveGroupBannerPictureEventHandler
  implements IEventHandler<SaveGroupBannerPictureEvent>
{
  logger_console = new Logger('SaveGroupBannerPictureEvent');

  handle(event: SaveGroupPictureEvent): any {
    logger.info(
      'Group with id ( ' +
        event.mediaDto.ownerId +
        ' ) upload new banner picture with name ' +
        event.mediaDto.fileName,
    );

    this.logger_console.log(
      'Event with id ( ' +
        event.mediaDto.ownerId +
        ' ) upload new banner picture with name ' +
        event.mediaDto.fileName,
    );
  }
}
