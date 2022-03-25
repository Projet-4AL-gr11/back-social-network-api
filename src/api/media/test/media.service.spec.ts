import { MediaService } from '../media.service';
import { Media } from '../domain/entities/media.entity';
import { MediaDto } from '../domain/dto/media.dto';
import { MediaResponseDto } from '../domain/dto/media-response.dto';
import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('MediaService', () => {
  let service: MediaService;
  let commandBus: jest.Mock;
  let queryBus: jest.Mock;
  const mockMedia = new Media();
  mockMedia.id = '1';
  const mockMediaDto = new MediaDto(Buffer.alloc(10, '1'), '1', 'top');
  const mockMediaResponse = new MediaResponseDto(mockMedia, 'bonjour');

  beforeEach(async () => {
    commandBus = jest.fn().mockResolvedValue('');
    queryBus = jest.fn().mockResolvedValue('');
    const modRef = await Test.createTestingModule({
      providers: [
        MediaService,
        {
          provide: CommandBus,
          useValue: {
            execute: commandBus,
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: queryBus,
          },
        },
      ],
    }).compile();
    service = modRef.get(MediaService);
  });

  describe('getBannerPicture', () => {
    beforeEach(async () => {
      queryBus.mockResolvedValue(mockMediaResponse);
    });
    it('should return a media', async () => {
      expect(await service.getBannerPicture('1')).toEqual(mockMediaResponse);
    });
  });

  describe('getProfilePicture', () => {
    beforeEach(async () => {
      queryBus.mockResolvedValue(mockMediaResponse);
    });
    it('should return a media', async () => {
      expect(await service.getProfilePicture('1')).toEqual(mockMediaResponse);
    });
  });

  describe('getEventPicture', () => {
    beforeEach(async () => {
      queryBus.mockResolvedValue(mockMediaResponse);
    });
    it('should return a media', async () => {
      expect(await service.getEventPicture('1')).toEqual(mockMediaResponse);
    });
  });

  describe('getGroupPicture', () => {
    beforeEach(async () => {
      queryBus.mockResolvedValue(mockMediaResponse);
    });
    it('should return a media', async () => {
      expect(await service.getGroupPicture('1')).toEqual(mockMediaResponse);
    });
  });

  describe('SaveBannerPicture', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(mockMedia);
    });
    it('should return the new media', async () => {
      expect(await service.uploadBannerPicture(mockMediaDto)).toEqual(
        mockMedia,
      );
    });
  });

  describe('SaveProfilePicture', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(mockMedia);
    });
    it('should return the new media', async () => {
      expect(await service.uploadBannerPicture(mockMediaDto)).toEqual(
        mockMedia,
      );
    });
  });

  describe('SaveEventPicture', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(mockMedia);
    });
    it('should return the new media', async () => {
      expect(await service.uploadEventPicture(mockMediaDto)).toEqual(mockMedia);
    });
  });

  describe('SaveGroupPicture', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(mockMedia);
    });
    it('should return the new media', async () => {
      expect(await service.uploadGroupPicture(mockMediaDto)).toEqual(mockMedia);
    });
  });

  describe('DeleteBannerPicture', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(undefined);
    });
    it('should return nothing', async () => {
      expect(await service.deleteBannerPicture('1')).toEqual(undefined);
    });
  });

  describe('DeleteProfilePicture', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(undefined);
    });
    it('should return nothing', async () => {
      expect(await service.deleteProfilePicture('1')).toEqual(undefined);
    });
  });

  describe('DeleteEventPicture', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(undefined);
    });
    it('should return nothing', async () => {
      expect(await service.deleteEventPicture('1')).toEqual(undefined);
    });
  });

  describe('DeleteGroupPicture', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(undefined);
    });
    it('should return nothing', async () => {
      expect(await service.deleteGroupPicture('1')).toEqual(undefined);
    });
  });
});
