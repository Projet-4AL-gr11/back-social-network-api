export class SendGroupRequestEvent {
  constructor(public readonly userId: string, public readonly groupId) {}
}
