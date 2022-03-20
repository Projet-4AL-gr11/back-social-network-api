import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RemoveFriendshipCommand } from '../command/remove-friendship.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Friendship } from '../../domain/entities/friendship.entity';
import { Repository } from 'typeorm';
import { RemoveFriendshipEvent } from '../event/remove-friendship.event';
import { ErrorEvent } from '../../../../util/error/error.event';

@CommandHandler(RemoveFriendshipCommand)
export class RemoveFriendshipHandler
  implements ICommandHandler<RemoveFriendshipCommand>
{
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RemoveFriendshipCommand): Promise<void> {
    try {
      const friendship = await this.friendshipRepository
        .createQueryBuilder()
        .leftJoinAndSelect('Friendship.friendOne', 'FriendOne')
        .leftJoinAndSelect('Friendship.friendTwo', 'FriendTwo')
        .where('FriendOne.id=:friendOneId and FriendTwo.id=:friendTwoId ', {
          friendOneId: command.friendOne,
          friendTwoId: command.friendTwo,
        })
        .orWhere('FriendOne.id=:friendTwoId or FriendTwo.id=:friendOneId', {
          friendTwoId: command.friendTwo,
          friendOneId: command.friendOne,
        })
        .getOne();
      if (friendship) {
        await this.friendshipRepository.remove(friendship);
        this.eventBus.publish(
          new RemoveFriendshipEvent(command.friendOne, command.friendTwo),
        );
      }
    } catch (error) {
      this.eventBus.publish(new ErrorEvent('RemoveFriendshipHandler', error));
      //TODO: Envoyer une bonne erreur d'user
      throw error;
    }
  }
}
