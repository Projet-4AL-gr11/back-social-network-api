import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateConnectedUserCommand } from '../../command/create-connected-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CreateJoinedConversationCommand } from '../../command/create-joined-conversation.command';
import { JoinedConversation } from '../../../domain/entities/joined-conversation.entity';
import { CreateJoinedConversationEvent } from '../../event/create-joined-conversation.event';

@CommandHandler(CreateJoinedConversationCommand)
export class CreateJoinedConversationHandler
  implements ICommandHandler<CreateJoinedConversationCommand>
{
  constructor(
    @InjectRepository(JoinedConversation)
    private readonly joinedConversationRepository: Repository<JoinedConversation>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: CreateJoinedConversationCommand,
  ): Promise<JoinedConversation> {
    try {
      const newConnectedUser = await this.joinedConversationRepository.create({
        user: command.joinedConversationDto.user,
        socketId: command.joinedConversationDto.socketId,
        conversation: command.joinedConversationDto.conversation,
      });
      await this.joinedConversationRepository.save(newConnectedUser);
      this.eventBus.publish(
        new CreateJoinedConversationEvent(
          newConnectedUser.user.id,
          newConnectedUser.id,
        ),
      );
      return newConnectedUser;
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent(
          'CreateConnectedUserCommand',
          'Failed to create new joinedConversation for User ' +
            command.joinedConversationDto.user.id,
        ),
      );
    }
  }
}
