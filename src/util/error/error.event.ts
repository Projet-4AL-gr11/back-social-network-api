export class ErrorEvent {
  constructor(
    public readonly localisation: string,
    public readonly error: string,
  ) {}
}
