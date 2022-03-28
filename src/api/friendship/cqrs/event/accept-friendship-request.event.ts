export class AcceptFriendshipRequestEvent {
  constructor(
    public readonly senderId: string,
    public readonly userId: string,
  ) {}
}
