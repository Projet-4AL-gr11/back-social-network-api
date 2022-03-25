export class AddParticipantToEventEvent {
  constructor(
    public readonly eventId: string,
    public readonly userId: string,
  ) {}
}
