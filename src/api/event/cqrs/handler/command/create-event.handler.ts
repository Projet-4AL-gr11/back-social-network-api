import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Event } from '../../../domain/entities/event.entity';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventCommand } from '../../command/create-event.command';
import { validate } from 'class-validator';
import { CreateEventEvent } from '../../event/create-event.event';

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateEventCommand): Promise<Event> {
    try {
      const event = await this.eventRepository.create({
        name: command.eventDto.name,
        endDate: new Date(command.eventDto.endDate),
        startDate: new Date(command.eventDto.startDate),
        user: command.eventDto.user,
        group: command.eventDto?.group,
        description: command.eventDto.description,
      });
      const err = await validate(event, { validationError: { target: false } });
      if (err.length > 0) {
        throw err;
      }
      const newEvent = await this.eventRepository.save(event);
      this.eventBus.publish(new CreateEventEvent(newEvent.id));
      return newEvent;
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('CreateEventHandler', error));
      throw error;
    }
  }
}
