export class AddGroupFollowerCommand {
  constructor(
    public readonly userId: string,
    public readonly groupId: string,
  ) {}
}
