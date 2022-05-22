import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { logger } from '../../../../util/config/winston-logger.config';
import { BlockUserEvent } from '../event/block-user.event';

@EventsHandler(BlockUserEvent)
export class BlockUserEventHandler implements IEventHandler<BlockUserEvent> {
  logger_console = new Logger('BlockUserEvent');

  handle(event: BlockUserEvent): void {
    logger.info(
      'User with id : ( ' +
        event.currentUserId +
        ' ) have block user with id : ( ' +
        event.userId +
        ' )',
    );

    this.logger_console.log(
      'User with id : ( ' +
        event.currentUserId +
        ' ) have block user with id : ( ' +
        event.userId +
        ' )',
    );
  }
}
