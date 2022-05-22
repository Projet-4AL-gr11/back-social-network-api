import { MediaDto } from '../../domain/dto/media.dto';

export class SaveBannerPictureEvent {
  constructor(public readonly mediaDto: MediaDto) {}
}
