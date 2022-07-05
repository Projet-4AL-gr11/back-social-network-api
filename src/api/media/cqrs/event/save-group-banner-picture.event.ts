import { MediaDto } from '../../domain/dto/media.dto';

export class SaveGroupBannerPictureEvent {
  constructor(public readonly mediaDto: MediaDto) {}
}
