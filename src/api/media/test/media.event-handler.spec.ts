import { DeletePictureEventHandler } from '../cqrs/event-handler/delete-picture-event.handler';
import { Test } from '@nestjs/testing';
import { logger } from '../../../util/config/winston-logger.config';
import { SaveBannerPictureEventHandler } from '../cqrs/event-handler/save-banner-picture.event-handler';
import { MediaDto } from '../domain/dto/media.dto';
import { SaveBannerPictureEvent } from '../cqrs/event/save-banner-picture.event';
import { SaveProfilePictureEventHandler } from '../cqrs/event-handler/save-profile-picture.event-handler';
import { SaveProfilePictureEvent } from '../cqrs/event/save-profile-picture.event';
import { SaveEventPictureEventHandler } from '../cqrs/event-handler/save-event-picture.event-handler';
import { SaveGroupPictureEventHandler } from '../cqrs/event-handler/save-group-picture.event-handler';
import { SavePostPictureEventHandler } from "../cqrs/event-handler/save-post-picture.event-handler";
import { SavePostPictureEvent } from "../cqrs/event/save-post-picture.event";
import { SaveCommentPictureEventHandler } from "../cqrs/event-handler/save-comment-picture.event-handler";
import { SaveCommentPictureEvent } from "../cqrs/event/save-comment-picture.event";

describe('MediaEventHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockMediaDto = new MediaDto(Buffer.alloc(10, '1'), '1', 'top');

  describe('DeletePictureEventHandler', () => {
    let handler: DeletePictureEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [DeletePictureEventHandler],
      }).compile();
      handler = mod.get(DeletePictureEventHandler);
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

  describe('SaveEventPictureEventHandler', () => {
    let handler: SaveEventPictureEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [SaveEventPictureEventHandler],
      }).compile();
      handler = mod.get(SaveEventPictureEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle(new SaveProfilePictureEvent(mockMediaDto));
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('SaveGroupPictureEventHandler', () => {
    let handler: SaveGroupPictureEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [SaveGroupPictureEventHandler],
      }).compile();
      handler = mod.get(SaveGroupPictureEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle(new SaveProfilePictureEvent(mockMediaDto));
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });


  describe('SavePostPictureEventHandler', () => {
    let handler: SavePostPictureEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [SavePostPictureEventHandler],
      }).compile();
      handler = mod.get(SavePostPictureEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle(new SavePostPictureEvent(mockMediaDto));
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });


  describe('SaveCommentPictureEventHandler', () => {
    let handler: SaveCommentPictureEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [SaveCommentPictureEventHandler],
      }).compile();
      handler = mod.get(SaveCommentPictureEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle(new SaveCommentPictureEvent(mockMediaDto));
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });
});
