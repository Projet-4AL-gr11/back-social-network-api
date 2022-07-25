import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../domain/entities/event.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { AddExerciseToEventCommand } from '../../command/add-exercise-to-event.command';
import { AddExerciseToEventEvent } from '../../event/add-exercise-to-event.event';

@CommandHandler(AddExerciseToEventCommand)
export class AddExerciseToEventHandler
  implements ICommandHandler<AddExerciseToEventCommand>
{
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private eventBus: EventBus,
  ) {}

  async execute(command: AddExerciseToEventCommand): Promise<void> {
    try {
      await this.eventRepository
        .createQueryBuilder()
        .relation(Event, 'exercises')
        .of(command.eventId)
        .add(command.exerciseId);
      this.eventBus.publish(
        new AddExerciseToEventEvent(command.exerciseId, command.eventId),
      );
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('AddExerciseToEventCommand', error),
      );
      throw error;
    }
  }
}
