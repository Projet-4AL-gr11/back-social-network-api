import {
  CommandHandler,
  ICommandHandler,
  InvalidEventsHandlerException,
} from '@nestjs/cqrs';
import { SendFriendshipRequestCommand } from '../command/send-friendship-request.command';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendshipRequest } from '../../domain/entities/friendship-request.entity';
import { Repository } from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';

@CommandHandler(SendFriendshipRequestCommand)
export class SendFriendshipRequestHandler
  implements ICommandHandler<SendFriendshipRequestCommand>
{
  logger = new Logger('SendFriendshipRequestCommand');

  constructor(
    @InjectRepository(FriendshipRequest)
    private friendRequestRepository: Repository<FriendshipRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(
    command: SendFriendshipRequestCommand,
  ): Promise<FriendshipRequest> {
    try {
      const user: User = await this.userRepository.findOneOrFail(
        command.userId,
      );
      const friendshipRequest = this.friendRequestRepository.create({
        sender: command.sender,
        user: user,
      });

      this.logger.log(
        'UserId ' + command.sender.id + ' sent friendship to ' + command.userId,
      );
      return this.friendRequestRepository.save(friendshipRequest);
    } catch (error) {
      this.logger.error(error);
      //TODO: Envoyer une bonne erreur d'user
      throw error;
    }
  }
}
