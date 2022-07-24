export class UpdateEventRankingDto {
  constructor(
    public readonly userId: string,
    public readonly eventId: string,
    public readonly score: number,
  ) {}
}
