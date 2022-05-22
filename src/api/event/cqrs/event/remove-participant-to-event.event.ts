export class RemoveParticipantToEventEvent {
  constructor(
    public readonly eventId: string,
    public readonly userId: string,
  ) {}
}
