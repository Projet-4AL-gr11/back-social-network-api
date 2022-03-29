import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { SaveCommentPictureEvent } from '../event/save-comment-picture.event';

@EventsHandler(SaveCommentPictureEvent)
export class SaveCommentPictureEventHandler
  implements IEventHandler<SaveCommentPictureEvent>
{
  logger_console = new Logger('SaveCommentPictureEvent');

  handle(event: SaveCommentPictureEvent): any {
    logger.info(
      'User with id ( ' +
        event.mediaDto.ownerId +
        ' ) upload new comment picture with name ' +
        event.mediaDto.fileName,
    );

    this.logger_console.log(
      'User with id ( ' +
        event.mediaDto.ownerId +
        ' ) upload new comment picture with name ' +
        event.mediaDto.fileName,
    );
  }
}
