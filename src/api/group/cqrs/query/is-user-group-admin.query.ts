export class IsUserGroupAdminQuery {
  constructor(
    public readonly groupId: string,
    public readonly userId: string,
  ) {}
}
