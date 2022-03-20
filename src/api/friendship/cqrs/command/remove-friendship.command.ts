export class RemoveFriendshipCommand {
  constructor(
    public readonly friendOne: string,
    public readonly friendTwo: string,
  ) {}
}
