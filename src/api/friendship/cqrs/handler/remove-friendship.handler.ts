import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveFriendshipCommand } from '../command/remove-friendship.command';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friendship } from '../../domain/entities/friendship.entity';
import { Repository } from 'typeorm';

@CommandHandler(RemoveFriendshipCommand)
export class RemoveFriendshipHandler
  implements ICommandHandler<RemoveFriendshipCommand>
{
  logger = new Logger('RemoveFriendshipHandler');

  constructor(
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
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
        this.logger.log(
          'UserId ' +
            command.friendOne +
            ' remove friendship-request to ' +
            command.friendTwo,
        );
        await this.friendshipRepository.remove(friendship);
      }
    } catch (error) {
      this.logger.error(error);
      //TODO: Envoyer une bonne erreur d'user
      throw error;
    }
  }
}
