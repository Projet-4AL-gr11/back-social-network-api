export class GiveGroupOwnershipCommand {
  constructor(
    public readonly groupId: string,
    public readonly ownerId: string,
    public readonly userId: string,
  ) {}
}
