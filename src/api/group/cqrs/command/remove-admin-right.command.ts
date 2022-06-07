export class RemoveAdminRightCommand {
  constructor(
    public readonly groupId: string,
    public readonly userId: string,
  ) {}
}
