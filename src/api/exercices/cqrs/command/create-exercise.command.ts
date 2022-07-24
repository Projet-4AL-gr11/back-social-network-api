export class CreateExerciseCommand {
  constructor(
    public readonly exerciseTemplateId: string,
    public readonly eventId: string,
    public readonly name: string,
  ) {}
}
