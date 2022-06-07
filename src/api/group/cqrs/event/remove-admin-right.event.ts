export class RemoveAdminRightEvent {
  constructor(
    public readonly groupId: string,
    public readonly userId: string,
  ) {}
}
