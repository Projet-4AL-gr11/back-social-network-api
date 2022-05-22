export class MediaDto {
  constructor(
    public dataBuffer: Buffer,
    public ownerId: string,
    public fileName: string,
  ) {}
}
