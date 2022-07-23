export class AddLanguageToEventEvent {
  constructor(
    public readonly eventId: string,
    public readonly languageId: string,
  ) {}
}
