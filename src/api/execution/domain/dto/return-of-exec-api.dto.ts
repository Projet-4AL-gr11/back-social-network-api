export class ReturnOfExecApiDto {
  constructor(
    public readonly id?: string,
    public readonly language?: string,
    public readonly code?: string,
    public readonly code_result?: string,
    public readonly result?: string,
  ) {}
}
