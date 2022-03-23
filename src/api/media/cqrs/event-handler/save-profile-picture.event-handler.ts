import { SaveProfilePictureEvent } from '../event/save-profile-picture.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';

@EventsHandler(SaveProfilePictureEvent)
export class SaveProfilePictureEventHandler
  implements IEventHandler<SaveProfilePictureEvent>
{
  logger_console = new Logger('CreateMediaHandler');

  handle(event: SaveProfilePictureEvent): any {
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
