export class GetGroupPostQuery {
  constructor(
    public readonly groupId: string,
    public readonly offset: number,
    public readonly limit: number,
  ) {}
}
