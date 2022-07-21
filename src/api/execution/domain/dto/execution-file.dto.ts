export class ExecutionFileDto {
  constructor(
    public dataBuffer: Buffer,
    public ownerId: string,
    public fileName: string,
  ) {}
}
