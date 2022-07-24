import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../domain/entities/event.entity';
import { Repository } from 'typeorm';
import { AddExerciseToEventEvent } from '../../event/add-exercise-to-event.event';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { AddLanguageToEventCommand } from '../../command/add-language-to-event.command';
import { AddLanguageToEventEvent } from "../../event/add-language-to-event.event";

@CommandHandler(AddLanguageToEventCommand)
export class AddLanguageToEventHandler
  implements ICommandHandler<AddLanguageToEventCommand>
{
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private eventBus: EventBus,
  ) {}

  async execute(command: AddLanguageToEventCommand): Promise<void> {
    try {
      await this.eventRepository
        .createQueryBuilder()
        .relation(Event, 'languages')
        .of(command.eventId)
        .add(command.languageId);
      this.eventBus.publish(
        new AddLanguageToEventEvent(command.eventId, command.languageId),
      );
    } catch (error) {
      // TODO: retourné une vrai erreur
      this.eventBus.publish(
        new ErrorsEvent('AddLanguageToEventHandler', error),
      );
      throw error;
    }
  }
}
