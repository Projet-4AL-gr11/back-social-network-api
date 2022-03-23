import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { DeleteProfilePictureEvent } from "../event/delete-profile-picture.event";
import { Logger } from "@nestjs/common";
import { logger } from "../../../../util/config/winston-logger.config";

@EventsHandler(DeleteProfilePictureEvent)
export class DeleteProfilePictureEventHandler implements IEventHandler<DeleteProfilePictureEvent> {

  logger_console = new Logger('DeleteProfilePictureEvent');

  handle(event: DeleteProfilePictureEvent): any {
    logger.info(
      'Profile Picture with id : ( ' + event.fileId + ' ) have been delete',
    );

    this.logger_console.log(
      'Profile Picture with id : ( ' + event.fileId + ' ) have been delete',
    );
  }


}
