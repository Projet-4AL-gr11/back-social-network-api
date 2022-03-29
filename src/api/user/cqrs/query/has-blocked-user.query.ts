export class HasBlockedUserQuery {
  constructor(
    public readonly currentUser: string,
    public readonly userId: string,
  ) {}
}
