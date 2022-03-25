export class AddParticipantToEventCommand {
  constructor(
    public readonly eventId: string,
    public readonly userId: string,
  ) {}
}
