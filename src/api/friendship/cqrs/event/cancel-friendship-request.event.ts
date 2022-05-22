export class CancelFriendshipRequestEvent {
  constructor(
    public readonly senderId: string,
    public readonly userId: string,
  ) {}
}
