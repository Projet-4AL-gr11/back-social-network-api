import { SaveBannerPictureEvent } from '../cqrs/event/save-banner-picture.event';
import { MediaDto } from '../domain/dto/media.dto';
import { DeletePictureEvent } from '../cqrs/event/delete-picture.event';
import { SaveEventPictureEvent } from '../cqrs/event/save-event-picture.event';
import { SaveGroupPictureEvent } from '../cqrs/event/save-group-picture.event';

describe('MediaEvent', () => {
  const mockMediaDto = new MediaDto(Buffer.alloc(10, '1'), '1', 'top');

  describe('DeletePictureEvent', () => {
    it('should return a DeletePictureEvent instance', () => {
      const event = new DeletePictureEvent('1');
      expect(event.fileId).toBe('1');
      expect(event instanceof DeletePictureEvent).toBe(true);
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

  describe('SaveEventPictureEvent', () => {
    it('should return a SaveEventPictureEvent instance', () => {
      const event = new SaveEventPictureEvent(mockMediaDto);
      expect(event.mediaDto.ownerId).toBe(mockMediaDto.ownerId);
      expect(event.mediaDto.dataBuffer).toBe(mockMediaDto.dataBuffer);
      expect(event.mediaDto.fileName).toBe(mockMediaDto.fileName);
      expect(event instanceof SaveEventPictureEvent).toBe(true);
    });
  });

  describe('SaveGroupPictureEvent', () => {
    it('should return a SaveGroupPictureEvent instance', () => {
      const event = new SaveGroupPictureEvent(mockMediaDto);
      expect(event.mediaDto.ownerId).toBe(mockMediaDto.ownerId);
      expect(event.mediaDto.dataBuffer).toBe(mockMediaDto.dataBuffer);
      expect(event.mediaDto.fileName).toBe(mockMediaDto.fileName);
      expect(event instanceof SaveGroupPictureEvent).toBe(true);
    });
  });
});
