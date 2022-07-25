import { CancelFriendshipRequestCommand } from '../../command/cancel-friendship-request.command';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendshipRequest } from '../../../domain/entities/friendship-request.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CancelFriendshipRequestEvent } from '../../event/cancel-friendship-request.event';

@CommandHandler(CancelFriendshipRequestCommand)
export class CancelFriendshipRequestHandler
  implements ICommandHandler<CancelFriendshipRequestCommand>
{
  constructor(
    @InjectRepository(FriendshipRequest)
    private friendRequestRepository: Repository<FriendshipRequest>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CancelFriendshipRequestCommand): Promise<void> {
    try {
      const friendRequest: FriendshipRequest =
        await this.friendRequestRepository
          .createQueryBuilder()
          .leftJoinAndSelect('FriendshipRequest.user', 'User')
          .where('User.id=:userId', { userId: command.userId })
          .leftJoinAndSelect('FriendshipRequest.sender', 'Sender')
          .andWhere('Sender.id=:senderId', { senderId: command.sender })
          .getOne();
      await this.friendRequestRepository.remove(friendRequest);

      this.eventBus.publish(
        new CancelFriendshipRequestEvent(command.sender, command.userId),
      );
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('CancelFriendshipRequestHandler', error),
      );

      throw error;
    }
  }
}
