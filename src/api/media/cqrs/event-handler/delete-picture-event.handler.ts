import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeleteBannerPictureEvent } from '../event/delete-banner-picture.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(DeleteBannerPictureEvent)
export class DeleteBannerPictureEventHandler
  implements IEventHandler<DeleteBannerPictureEvent>
{
  logger_console = new Logger('DeleteBannerHandler');

  handle(event: DeleteBannerPictureEvent): any {
    logger.info(
      'BannerPicture with id : ( ' + event.fileId + ' ) have been delete',
    );

    this.logger_console.log(
      'BannerPicture with id : ( ' + event.fileId + ' ) have been delete',
    );
  }
}
