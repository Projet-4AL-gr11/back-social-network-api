import { MediaDto } from '../../domain/dto/media.dto';

export class SaveCommentPictureCommand {
  constructor(public readonly mediaDto: MediaDto) {}
}
