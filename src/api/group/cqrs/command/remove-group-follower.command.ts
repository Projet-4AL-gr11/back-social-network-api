export class RemoveGroupFollowerCommand {
  constructor(
    public readonly userId: string,
    public readonly groupId: string,
  ) {}
}
