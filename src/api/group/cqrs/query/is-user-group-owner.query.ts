export class IsUserGroupOwnerQuery {
  constructor(
    public readonly groupId: string,
    public readonly userId: string,
  ) {}
}
