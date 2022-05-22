export class RemoveExerciseToEventEvent {
  constructor(
    public readonly exerciseId: string,
    public readonly eventId: string,
  ) {}
}
