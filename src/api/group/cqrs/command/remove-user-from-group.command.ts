export class RemoveUserFromGroupCommand {
  constructor(
    public readonly groupId: string,
    public readonly userId: string,
  ) {}
}
