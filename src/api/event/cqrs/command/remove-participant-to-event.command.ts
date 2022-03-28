export class RemoveParticipantToEventCommand {
  constructor(
    public readonly eventId: string,
    public readonly userId: string,
  ) {}
}
