export class SendFriendshipRequestEvent {
  constructor(
    public readonly senderId: string,
    public readonly userId: string,
  ) {}
}
