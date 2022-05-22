export class SaveMessageEvent {
  constructor(
    public readonly authorId: string,
    public readonly content: string,
  ) {}
}
