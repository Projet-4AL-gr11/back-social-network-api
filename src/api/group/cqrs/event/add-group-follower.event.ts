export class AddGroupFollowerEvent {
  constructor(
    public readonly userId: string,
    public readonly groupId: string,
  ) {}
}
