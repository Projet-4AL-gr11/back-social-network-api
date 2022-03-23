import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SaveMessageCommand } from '../command/save-message.command';
import { InjectRepository } from '@nestjs/typeorm';
import Message from '../../domain/entities/message.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';
import { SaveMessageEvent } from '../event/save-message.event';

@CommandHandler(SaveMessageCommand)
export class SaveMessageHandler implements ICommandHandler<SaveMessageCommand> {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SaveMessageCommand): Promise<Message> {
    try {
      const newMessage = await this.messagesRepository.create({
        content: command.content,
        author: command.author,
      });
      await this.messagesRepository.save(newMessage);
      this.eventBus.publish(
        new SaveMessageEvent(newMessage.author.id, newMessage.content),
      );
      return newMessage;
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('SaveMessageHandler', 'Failed to send message'),
      );
    }
  }
}
