export class CancelFriendshipRequestCommand {
  constructor(public readonly sender: string, public readonly userId: string) {}
}
