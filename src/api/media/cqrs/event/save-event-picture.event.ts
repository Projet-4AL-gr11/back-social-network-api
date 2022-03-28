import { MediaDto } from '../../domain/dto/media.dto';

export class SaveEventPictureEvent {
  constructor(public readonly mediaDto: MediaDto) {}
}
