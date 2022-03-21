import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  InvalidEventsHandlerException,
} from '@nestjs/cqrs';
import { SendFriendshipRequestCommand } from '../command/send-friendship-request.command';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendshipRequest } from '../../domain/entities/friendship-request.entity';
import { Repository } from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';
import { SendFriendshipRequestEvent } from '../event/send-friendship-request.event';

@CommandHandler(SendFriendshipRequestCommand)
export class SendFriendshipRequestHandler
  implements ICommandHandler<SendFriendshipRequestCommand>
{
  constructor(
    @InjectRepository(FriendshipRequest)
    private friendRequestRepository: Repository<FriendshipRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: SendFriendshipRequestCommand,
  ): Promise<FriendshipRequest> {
    try {
      const friendshipRequest = this.friendRequestRepository.create({
        sender: command.sender,
        user: command.user,
      });

      this.eventBus.publish(
        new SendFriendshipRequestEvent(command.sender.id, command.user.id),
      );

      return this.friendRequestRepository.save(friendshipRequest);
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('SendFriendshipRequestHandler', error),
      );
      //TODO: Envoyer une bonne erreur d'user
      throw error;
    }
  }
}