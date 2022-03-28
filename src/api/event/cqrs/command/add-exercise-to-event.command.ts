export class AddExerciseToEventCommand {
  constructor(
    public readonly exerciseId: string,
    public readonly eventId: string,
  ) {}
}
