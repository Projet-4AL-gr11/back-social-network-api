export class IsBlockedUserQuery {
  constructor(
    public readonly currentUser: string,
    public readonly userId: string,
  ) {}
}
