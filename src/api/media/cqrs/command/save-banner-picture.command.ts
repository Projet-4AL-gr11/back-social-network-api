import { MediaDto } from '../../domain/dto/media.dto';

export class SaveBannerPictureCommand {
  constructor(public readonly mediaDto: MediaDto) {}
}
