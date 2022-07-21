export class ExecuteResponseDto {
  constructor(
    public readonly log: string,
    public readonly isGoToNextExercise: boolean,
  ) {}
}
