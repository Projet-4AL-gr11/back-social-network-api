import { MediaDto } from '../../domain/dto/media.dto';

export class SavePostPictureCommand {
  constructor(public readonly mediaDto: MediaDto) {}
}
