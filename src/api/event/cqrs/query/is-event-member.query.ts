export class IsEventMemberQuery {
  constructor(
    public readonly eventId: string,
    public readonly userId: string,
  ) {}
}
