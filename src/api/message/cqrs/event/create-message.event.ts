export class CreateMessageEvent {
  constructor(
    public readonly userId: string,
    public readonly conversationId: string,
    public readonly messageId: string,
  ) {}
}
