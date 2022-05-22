export class BlockUserEvent {
  constructor(
    public readonly currentUserId: string,
    public readonly userId: string,
  ) {}
}
