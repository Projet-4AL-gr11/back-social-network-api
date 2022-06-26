export class GetUserFriendsQuery {
  constructor(
    public readonly userId: string,
    public readonly friendOne: boolean,
  ) {}
}
