export class CreateLeaderboardDto {
  constructor(
    public readonly userId: string,
    public readonly userEntry: string,
    public readonly exerciseId: string,
    public readonly timerScore: number,
    public readonly executionId: number,
    public readonly languageId: string,
  ) {}
}
