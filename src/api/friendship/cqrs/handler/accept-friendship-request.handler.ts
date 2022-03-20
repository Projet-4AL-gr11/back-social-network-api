import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AcceptFriendshipRequestCommand } from '../command/accept-friendship-request.command';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendshipRequest } from '../../domain/entities/friendship-request.entity';
import { Repository } from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Friendship } from '../../domain/entities/friendship.entity';
import { AcceptFriendshipRequestEvent } from '../event/accept-friendship-request.event';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';

@CommandHandler(AcceptFriendshipRequestCommand)
export class AcceptFriendshipRequestHandler
  implements ICommandHandler<AcceptFriendshipRequestCommand>
{
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: AcceptFriendshipRequestCommand): Promise<Friendship> {
    try {
      const friendship = this.friendshipRepository.create({
        friendOne: command.friendOne,
        friendTwo: command.friendTwo,
      });

      this.eventBus.publish(
        new AcceptFriendshipRequestEvent(
          command.friendOne.id,
          command.friendTwo.id,
        ),
      );
      return this.friendshipRepository.save(friendship);
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('AcceptFriendshipRequestHandler', error),
      );
      //TODO: Envoyer une bonne erreur d'user
      throw error;
    }
  }
}
