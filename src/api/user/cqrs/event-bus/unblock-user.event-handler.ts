import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BlockUserEvent } from '../event/block-user.event';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { UnblockUserEvent } from '../event/unblock-user.event';

@EventsHandler(UnblockUserEvent)
export class UnblockUserEventHandler
  implements IEventHandler<UnblockUserEvent>
{
  logger_console = new Logger('BlockUserEvent');

  handle(event: UnblockUserEvent): void {
    logger.info(
      'User with id : ( ' +
        event.currentUserId +
        ' ) have unblock user with id : ( ' +
        event.userId +
        ' )',
    );

    this.logger_console.log(
      'User with id : ( ' +
        event.currentUserId +
        ' ) have unblock user with id : ( ' +
        event.userId +
        ' )',
    );
  }
}
