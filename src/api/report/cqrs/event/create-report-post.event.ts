export class CreateReportPostEvent {
  constructor(
    public readonly userId: string,
    public readonly reportId: string,
    public readonly id: string,
  ) {}
}
