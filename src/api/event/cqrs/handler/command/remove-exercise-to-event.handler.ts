import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../domain/entities/event.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { RemoveExerciseToEventCommand } from '../../command/remove-exercise-to-event.command';
import { RemoveExerciseToEventEvent } from '../../event/remove-exercise-to-event.event';

@CommandHandler(RemoveExerciseToEventCommand)
export class RemoveExerciseToEventHandler
  implements ICommandHandler<RemoveExerciseToEventCommand>
{
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private eventBus: EventBus,
  ) {}

  async execute(command: RemoveExerciseToEventCommand): Promise<void> {
    try {
      await this.eventRepository
        .createQueryBuilder()
        .relation(Event, 'exercises')
        .of(command.eventId)
        .remove(command.exerciseId);
      this.eventBus.publish(
        new RemoveExerciseToEventEvent(command.exerciseId, command.eventId),
      );
    } catch (error) {
      // TODO: retourné une vrai erreur
      this.eventBus.publish(
        new ErrorsEvent('RemoveExerciseToEventCommand', error),
      );
      throw error;
    }
  }
}
