export class FriendshipDto {
  constructor(
    public readonly senderId: string,
    public readonly userId: string,
  ) {}
}
