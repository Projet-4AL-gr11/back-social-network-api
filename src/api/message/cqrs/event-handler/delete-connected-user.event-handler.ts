import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { DeleteConnectedUserEvent } from '../event/delete-connected-user.event';

@EventsHandler(DeleteConnectedUserEvent)
export class DeleteConnectedUserEventHandler
  implements IEventHandler<DeleteConnectedUserEvent>
{
  logger_console = new Logger('DeleteConnectedUserEvent');

  handle(event: DeleteConnectedUserEvent): any {
    logger.info(
      'ConnectedUser with id : ( ' + event.id + ' ) have been delete.',
    );

    this.logger_console.log(
      'ConnectedUser with id : ( ' + event.id + ' ) have been delete.',
    );
  }
}
