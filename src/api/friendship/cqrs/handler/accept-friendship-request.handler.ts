import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AcceptFriendshipRequestCommand } from '../command/accept-friendship-request.command';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendshipRequest } from '../../domain/entities/friendship-request.entity';
import { Repository } from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Friendship } from '../../domain/entities/friendship.entity';

@CommandHandler(AcceptFriendshipRequestCommand)
export class AcceptFriendshipRequestHandler
  implements ICommandHandler<AcceptFriendshipRequestCommand>
{
  logger = new Logger('AcceptFriendshipRequestHandler');

  constructor(
    @InjectRepository(FriendshipRequest)
    private friendRequestRepository: Repository<FriendshipRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
  ) {}

  async execute(command: AcceptFriendshipRequestCommand): Promise<Friendship> {
    try {
      const friendTwo: User = await this.userRepository.findOneOrFail(
        command.friendTwo,
      );
      const friendship = this.friendshipRepository.create({
        friendOne: command.friendOne,
        friendTwo: friendTwo,
      });

      //Cancel Friendship Request
      await this.friendRequestRepository.remove(
        await this.friendRequestRepository
          .createQueryBuilder()
          .leftJoinAndSelect('FriendRequest.user', 'User')
          .where('User.id=:id', { id: friendTwo.id })
          .leftJoinAndSelect('FriendRequest.sender', 'Sender')
          .andWhere('Sender.username=:id', { id: command.friendOne.id })
          .getOne(),
      );
      this.logger.log(
        'UserId ' +
          command.friendOne.id +
          ' cancel friendship to ' +
          command.friendTwo,
      );
      this.logger.log(
        'UserId ' +
          command.friendOne.id +
          ' become friend with ' +
          command.friendTwo,
      );
      return this.friendshipRepository.save(friendship);
    } catch (error) {
      this.logger.error(error);
      //TODO: Envoyer une bonne erreur d'user
      throw error;
    }
  }
}
