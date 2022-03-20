export class ErrorsEvent {
  constructor(
    public readonly localisation: string,
    public readonly error: string,
  ) {}
}
