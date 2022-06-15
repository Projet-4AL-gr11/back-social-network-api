export class AcceptGroupRequestEvent {
  constructor(public readonly userId: string, public readonly groupId) {}
}
