import { MediaDto } from '../../domain/dto/media.dto';

export class SaveProfilePictureEvent {
  constructor(public readonly mediaDto: MediaDto) {}
}
