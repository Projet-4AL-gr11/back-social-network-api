export class RemoveGroupFollowerEvent {
  constructor(
    public readonly userId: string,
    public readonly groupId: string,
  ) {}
}
