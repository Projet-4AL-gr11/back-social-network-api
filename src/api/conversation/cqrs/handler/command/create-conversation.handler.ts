import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CreateConversationCommand } from '../../command/create-conversation.command';
import { Conversation } from '../../../domain/entities/conversation.entity';
import { CreateConversationEvent } from '../../event/create-conversation.event';

@CommandHandler(CreateConversationCommand)
export class CreateConversationHandler
  implements ICommandHandler<CreateConversationCommand>
{
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateConversationCommand): Promise<Conversation> {
    try {
      const conversation = this.conversationRepository.create({
        users: command.userList,
      });
      const err = await validate(conversation);
      if (err.length > 0) {
        throw err;
      }
      const newConversation = await this.conversationRepository.save(
        conversation,
      );
      this.eventBus.publish(
        new CreateConversationEvent(command.userList, conversation.id),
      );
      return newConversation;
    } catch (error) {
      // TODO: créer une vrai erreur
      this.eventBus.publish(new ErrorsEvent('AddCommentCommand', error));
      throw error;
    }
  }
}
