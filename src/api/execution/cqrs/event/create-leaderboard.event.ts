export class CreateLeaderboardEvent {
  constructor(
    public readonly leaderboardId: string,
    public readonly userId: string,
    public readonly exerciseId: string,
    public readonly executionId: number,
  ) {}
}
