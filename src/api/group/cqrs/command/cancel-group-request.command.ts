export class CancelGroupRequestCommand {
  constructor(public readonly userId: string, public readonly groupId) {}
}
