export class AddLanguageToEventCommand {
  constructor(
    public readonly eventId: string,
    public readonly languageId: string,
  ) {}
}
