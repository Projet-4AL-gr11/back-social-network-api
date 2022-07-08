export class GetGroupRequestStatusQuery {
  constructor(
    public readonly userId: string,
    public readonly groupId: string,
  ) {}
}
