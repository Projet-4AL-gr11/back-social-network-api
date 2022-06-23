import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { DeleteConnectedUserEvent } from "../event/delete-connected-user.event";
import { Logger } from "@nestjs/common";
import { logger } from "../../../../util/config/winston-logger.config";
import { DeleteAllConnectedUserEvent } from "../event/delete-all-connected-user.event";

@EventsHandler(DeleteAllConnectedUserEvent)
export class DeleteAllConnectedUserEventHandler
  implements IEventHandler<DeleteAllConnectedUserEvent>
{
  logger_console = new Logger('DeleteAllConnectedUserEvent');

  handle(event: DeleteAllConnectedUserEvent): any {
    logger.info(
      'ConnectedUser with id : ( ' + event.userId + ' ) have all been delete.',
    );

    this.logger_console.log(
      'ConnectedUser with id : ( ' + event.userId + ' ) have all been delete.',
    );
  }
}
