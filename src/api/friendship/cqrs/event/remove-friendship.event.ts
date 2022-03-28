export class RemoveFriendshipEvent {
  constructor(
    public readonly senderId: string,
    public readonly userId: string,
  ) {}
}
