export class BlockUserCommand {
  constructor(
    public readonly currentUserId: string,
    public readonly userId: string,
  ) {}
}
