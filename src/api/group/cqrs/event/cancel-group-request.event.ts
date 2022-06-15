export class CancelGroupRequestEvent {
  constructor(public readonly userId: string, public readonly groupId) {}
}
