import { EventDto } from '../../domain/dto/event.dto';

export class UpdateEventEvent {
  constructor(
    public readonly eventId: string,
    public readonly eventDto: EventDto,
  ) {}
}
