import { CancelFriendshipRequestCommand } from '../command/cancel-friendship-request.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendshipRequest } from '../../domain/entities/friendship-request.entity';
import { Repository } from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';

@CommandHandler(CancelFriendshipRequestCommand)
export class CancelFriendshipRequestHandler
  implements ICommandHandler<CancelFriendshipRequestCommand>
{
  logger = new Logger('CancelFriendshipRequestHandler');

  constructor(
    @InjectRepository(FriendshipRequest)
    private friendRequestRepository: Repository<FriendshipRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(command: CancelFriendshipRequestCommand): Promise<void> {
    try {
      await this.friendRequestRepository.remove(
        await this.friendRequestRepository
          .createQueryBuilder()
          .leftJoinAndSelect('FriendRequest.user', 'User')
          .where('User.id=:id', { id: command.sender })
          .leftJoinAndSelect('FriendRequest.sender', 'Sender')
          .andWhere('Sender.username=:id', { id: command.userId })
          .getOne(),
      );
      this.logger.log(
        'UserId ' +
          command.sender +
          ' cancel friendship-request to ' +
          command.userId,
      );
    } catch (error) {
      this.logger.error(error);
      //TODO: Envoyer une bonne erreur d'user
      throw error;
    }
  }
}
