import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { CreateConnectedUserEvent } from '../event/create-connected-user.event';

@EventsHandler(CreateConnectedUserEvent)
export class CreateConnectedUserEventHandler
  implements IEventHandler<CreateConnectedUserEvent>
{
  logger_console = new Logger('CreateConnectedUserEvent');

  handle(event: CreateConnectedUserEvent): any {
    logger.info(
      'User with id : ' +
        event.userId +
        ' now connected to socket with Id : ' +
        event.socketId,
    );

    this.logger_console.log(
      'User with id : ' +
        event.userId +
        ' now connected to socket with Id : ' +
        event.socketId,
    );
  }
}
