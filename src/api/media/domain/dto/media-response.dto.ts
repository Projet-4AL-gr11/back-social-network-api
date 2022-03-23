import { Media } from '../entities/media.entity';

export class MediaResponseDto {
  constructor(public readonly media: Media, public readonly link: string) {}
}
