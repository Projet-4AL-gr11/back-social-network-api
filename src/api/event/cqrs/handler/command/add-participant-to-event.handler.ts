import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AddParticipantToEventCommand } from '../../command/add-participant-to-event.command';
import { Repository } from 'typeorm';
import { Event } from '../../../domain/entities/event.entity';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { AddParticipantToEventEvent } from '../../event/add-participant-to-event.event';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(AddParticipantToEventCommand)
export class AddParticipantToEventHandler
  implements ICommandHandler<AddParticipantToEventCommand>
{
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private eventBus: EventBus,
  ) {}

  async execute(command: AddParticipantToEventCommand): Promise<void> {
    try {
      await this.eventRepository
        .createQueryBuilder()
        .relation(Event, 'participants')
        .of(command.eventId)
        .add(command.userId);
      this.eventBus.publish(
        new AddParticipantToEventEvent(command.eventId, command.userId),
      );
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('AddParticipantToEventHandler', error),
      );
      throw error;
    }
  }
}
