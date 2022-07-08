import { MediaDto } from '../../domain/dto/media.dto';

export class SaveGroupBannerPictureCommand {
  constructor(public readonly mediaDto: MediaDto) {}
}
