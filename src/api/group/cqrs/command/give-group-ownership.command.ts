export class GiveGroupOwnershipCommand {
  constructor(
    public readonly groupId: string,
    public readonly userId: string,
  ) {}
}
