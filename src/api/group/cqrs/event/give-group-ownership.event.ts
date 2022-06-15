export class GiveGroupOwnershipEvent {
  constructor(
    public readonly groupId,
    public readonly ownerId,
    public readonly userId,
  ) {}
}
