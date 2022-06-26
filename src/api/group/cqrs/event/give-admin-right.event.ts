export class GiveAdminRightEvent {
  constructor(
    public readonly groupId: string,
    public readonly userId: string,
  ) {}
}
