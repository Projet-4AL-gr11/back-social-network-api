import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CreateMessageCommand } from '../../command/create-message.command';
import { CreateMessageEvent } from '../../event/create-message.event';
import Message from '../../../domain/entities/message.entity';

@CommandHandler(CreateMessageCommand)
export class CreateMessageHandler
  implements ICommandHandler<CreateMessageCommand>
{
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateMessageCommand): Promise<Message> {
    try {
      const newMessage = await this.messageRepository.create({
        author: command.user,
        content: command.content,
        conversation: command.conversation,
      });
      await this.messageRepository.save(newMessage);
      this.eventBus.publish(
        new CreateMessageEvent(newMessage.author.id, newMessage.id),
      );
      return newMessage;
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent(
          'CreateMessageCommand',
          'Failed to create new message User for ' + command.user.id,
        ),
      );
    }
  }
}
