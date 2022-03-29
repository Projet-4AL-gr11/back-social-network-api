export class UnblockUserEvent {
  constructor(
    public readonly currentUserId: string,
    public readonly userId: string,
  ) {}
}
