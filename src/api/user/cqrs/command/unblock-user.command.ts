export class UnblockUserCommand {
  constructor(
    public readonly currentUserId: string,
    public readonly userId: string,
  ) {}
}
