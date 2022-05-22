export class GetStatusFriendshipQuery {
  constructor(
    public readonly currentUser: string,
    public readonly user: string,
  ) {}
}
