export class ReportRequestDto {
  constructor(
    public readonly creatorId: string,
    public readonly text: string,
    public readonly reportedComment?: string,
    public readonly reportedEvent?: string,
    public readonly reportedGroup?: string,
    public readonly reportedPost?: string,
    public readonly reportedUser?: string,
    public readonly reportedExercise?: string,
  ) {}
}
