export class RemoveExerciseToEventCommand {
  constructor(
    public readonly exerciseId: string,
    public readonly eventId: string,
  ) {}
}
