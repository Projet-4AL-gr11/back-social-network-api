export class CreateGroupEvent {
  constructor(
    public readonly userId: string,
    public readonly groupName: string,
  ) {}
}
