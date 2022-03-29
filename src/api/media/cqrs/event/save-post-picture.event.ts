import { MediaDto } from '../../domain/dto/media.dto';

export class SavePostPictureEvent {
  constructor(public readonly mediaDto: MediaDto) {}
}
