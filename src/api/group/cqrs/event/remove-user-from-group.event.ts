export class RemoveUserFromGroupEvent {
  constructor(
    public readonly userId: string,
    public readonly groupId: string,
  ) {}
}
