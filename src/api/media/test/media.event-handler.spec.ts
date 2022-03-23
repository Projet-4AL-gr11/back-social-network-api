import { DeleteBannerPictureEventHandler } from '../cqrs/event-handler/delete-banner-picture.event-handler';
import { Test } from '@nestjs/testing';
import { logger } from '../../../util/config/winston-logger.config';
import { DeleteProfilePictureEventHandler } from '../cqrs/event-handler/delete-profile-picture.event-handler';
import { SaveBannerPictureEventHandler } from '../cqrs/event-handler/save-banner-picture.event-handler';
import { MediaDto } from '../domain/dto/media.dto';
import { SaveBannerPictureEvent } from '../cqrs/event/save-banner-picture.event';
import { SaveProfilePictureEventHandler } from '../cqrs/event-handler/save-profile-picture.event-handler';
import { SaveProfilePictureEvent } from '../cqrs/event/save-profile-picture.event';

describe('MediaEventHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockMediaDto = new MediaDto(Buffer.alloc(10, '1'), '1', 'top');

  describe('DeleteBannerPictureEventHandler', () => {
    let handler: DeleteBannerPictureEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [DeleteBannerPictureEventHandler],
      }).compile();
      handler = mod.get(DeleteBannerPictureEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ fileId: '1' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('DeleteProfilePictureEventHandler', () => {
    let handler: DeleteProfilePictureEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [DeleteProfilePictureEventHandler],
      }).compile();
      handler = mod.get(DeleteProfilePictureEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ fileId: '1' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('SaveBannerPictureEventHandler', () => {
    let handler: SaveBannerPictureEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [SaveBannerPictureEventHandler],
      }).compile();
      handler = mod.get(SaveBannerPictureEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle(new SaveBannerPictureEvent(mockMediaDto));
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('SaveProfilePictureEventHandler', () => {
    let handler: SaveProfilePictureEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [SaveProfilePictureEventHandler],
      }).compile();
      handler = mod.get(SaveProfilePictureEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle(new SaveProfilePictureEvent(mockMediaDto));
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });
});
