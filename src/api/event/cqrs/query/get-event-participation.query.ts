export class GetEventParticipationQuery {
  constructor(
    public readonly userId: string,
    public readonly offset?: number,
    public readonly limit?: number,
  ) {}
}
