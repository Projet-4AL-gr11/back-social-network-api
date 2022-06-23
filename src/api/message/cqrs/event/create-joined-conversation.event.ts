export class CreateJoinedConversationEvent {
  constructor(public readonly userId: string, public readonly id: string) {}
}
