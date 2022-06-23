export class CreateMessageEvent {
  constructor(
    public readonly userId: string,
    public readonly messageId: string,
  ) {}
}
