import { MediaDto } from '../../domain/dto/media.dto';

export class SaveCommentPictureEvent {
  constructor(public readonly mediaDto: MediaDto) {}
}
