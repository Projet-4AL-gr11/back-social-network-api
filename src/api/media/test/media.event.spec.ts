import { DeleteBannerPictureEvent } from '../cqrs/event/delete-banner-picture.event';
import { DeleteProfilePictureEvent } from '../cqrs/event/delete-profile-picture.event';
import { SaveBannerPictureEvent } from '../cqrs/event/save-banner-picture.event';
import { MediaDto } from '../domain/dto/media.dto';

describe('MediaEvent', () => {
  const mockMediaDto = new MediaDto(Buffer.alloc(10, '1'), '1', 'top');

  describe('DeleteBannerPictureEvent', () => {
    it('should return a DeleteBannerPictureEvent instance', () => {
      const event = new DeleteBannerPictureEvent('1');
      expect(event.fileId).toBe('1');
      expect(event instanceof DeleteBannerPictureEvent).toBe(true);
    });
  });

  describe('DeleteProfilePictureEvent', () => {
    it('should return a DeleteProfilePictureEvent instance', () => {
      const event = new DeleteProfilePictureEvent('1');
      expect(event.fileId).toBe('1');
      expect(event instanceof DeleteProfilePictureEvent).toBe(true);
    });
  });

  describe('SaveBannerPictureEvent', () => {
    it('should return a SaveBannerPictureEvent instance', () => {
      const event = new SaveBannerPictureEvent(mockMediaDto);
      expect(event.mediaDto.ownerId).toBe(mockMediaDto.ownerId);
      expect(event.mediaDto.dataBuffer).toBe(mockMediaDto.dataBuffer);
      expect(event.mediaDto.fileName).toBe(mockMediaDto.fileName);
      expect(event instanceof SaveBannerPictureEvent).toBe(true);
    });
  });

  describe('SaveBannerPictureEvent', () => {
    it('should return a SaveBannerPictureEvent instance', () => {
      const event = new SaveBannerPictureEvent(mockMediaDto);
      expect(event.mediaDto.ownerId).toBe(mockMediaDto.ownerId);
      expect(event.mediaDto.dataBuffer).toBe(mockMediaDto.dataBuffer);
      expect(event.mediaDto.fileName).toBe(mockMediaDto.fileName);
      expect(event instanceof SaveBannerPictureEvent).toBe(true);
    });
  });
});
