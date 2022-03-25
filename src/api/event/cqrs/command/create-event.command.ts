import { EventDto } from '../../domain/dto/event.dto';

export class CreateEventCommand {
  constructor(public readonly eventDto: EventDto) {}
}
