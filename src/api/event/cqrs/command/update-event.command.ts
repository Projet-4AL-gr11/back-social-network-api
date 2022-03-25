import { EventDto } from '../../domain/dto/event.dto';

export class UpdateEventCommand {
  constructor(
    public readonly eventId: string,
    public readonly eventDto: EventDto,
  ) {}
}
