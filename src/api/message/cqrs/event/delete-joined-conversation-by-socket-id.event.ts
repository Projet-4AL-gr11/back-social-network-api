export class DeleteJoinedConversationBySocketIdEvent {
  constructor(public readonly socketId: string) {}
}
