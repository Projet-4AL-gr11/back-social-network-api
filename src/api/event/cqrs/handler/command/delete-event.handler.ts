import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Event } from '../../../domain/entities/event.entity';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteEventCommand } from '../../command/delete-event.command';
import { DeleteEventEvent } from '../../event/delete-event.event';

@CommandHandler(DeleteEventCommand)
export class DeleteEventHandler implements ICommandHandler<DeleteEventCommand> {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private eventBus: EventBus,
  ) {}

  async execute(command: DeleteEventCommand): Promise<void> {
    try {
      await this.eventRepository.delete(command.id);
      this.eventBus.publish(new DeleteEventEvent(command.id));
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('DeleteEventHandler', error));
      throw error;
    }
  }
}
