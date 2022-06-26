export class GiveAdminRightCommand {
  constructor(
    public readonly groupId: string,
    public readonly userId: string,
  ) {}
}
