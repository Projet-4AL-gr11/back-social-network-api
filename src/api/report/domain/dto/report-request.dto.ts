export class ReportRequestDto {
  constructor(
    public readonly creatorId: string,
    public readonly text: string,
    public readonly commentId?: string,
    public readonly eventId?: string,
    public readonly groupId?: string,
    public readonly postId?: string,
    public readonly userId?: string,
  ) {}
}
