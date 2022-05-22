export class GetLeaderboardForUserWithExerciseIdQuery {
  constructor(
    public readonly userId: string,
    public readonly exerciseId: string,
  ) {}
}
