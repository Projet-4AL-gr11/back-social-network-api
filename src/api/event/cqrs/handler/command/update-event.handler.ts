import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Event } from '../../../domain/entities/event.entity';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateEventCommand } from '../../command/update-event.command';
import { UpdateEventEvent } from '../../event/update-event.event';

@CommandHandler(UpdateEventCommand)
export class UpdateEventHandler implements ICommandHandler<UpdateEventCommand> {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private eventBus: EventBus,
  ) {}

  async execute(command: UpdateEventCommand): Promise<void> {
    try {
      await this.eventRepository.update(command.eventId, command.eventDto);
      this.eventBus.publish(
        new UpdateEventEvent(command.eventId, command.eventDto),
      );
    } catch (error) {
      // TODO: retourné une vrai erreur
      this.eventBus.publish(new ErrorsEvent('UpdateEventHandler', error));
      throw error;
    }
  }
}
