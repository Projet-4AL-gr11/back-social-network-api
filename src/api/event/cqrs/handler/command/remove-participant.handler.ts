import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Event } from '../../../domain/entities/event.entity';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { InjectRepository } from '@nestjs/typeorm';
import { RemoveParticipantToEventCommand } from '../../command/remove-participant-to-event.command';
import { RemoveParticipantToEventEvent } from '../../event/remove-participant-to-event.event';

@CommandHandler(RemoveParticipantToEventCommand)
export class RemoveParticipantHandler
  implements ICommandHandler<RemoveParticipantToEventCommand>
{
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private eventBus: EventBus,
  ) {}

  async execute(command: RemoveParticipantToEventCommand): Promise<void> {
    try {
      await this.eventRepository
        .createQueryBuilder()
        .relation(Event, 'participants')
        .of(command.eventId)
        .remove(command.userId);
      this.eventBus.publish(
        new RemoveParticipantToEventEvent(command.eventId, command.userId),
      );
    } catch (error) {
      // TODO: retourné une vrai erreur
      this.eventBus.publish(
        new ErrorsEvent('RemoveParticipantToEventCommand', error),
      );
      throw error;
    }
  }
}
