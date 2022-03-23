import { DeleteBannerPictureCommand } from '../cqrs/command/delete-banner-picture.command';
import { DeleteProfilePictureCommand } from '../cqrs/command/delete-profile-picture.command';
import { SaveBannerPictureCommand } from '../cqrs/command/save-banner-picture.command';
import { MediaDto } from '../domain/dto/media.dto';

describe('MediaCommand', () => {
  const mockMediaDto = new MediaDto(Buffer.alloc(10, '1'), '1', 'top');
  describe('DeleteBannerPictureCommand', () => {
    it('should create a DeleteBannerPictureCommand instance', () => {
      const command = new DeleteBannerPictureCommand('1');
      expect(command.fileId).toBe('1');
      expect(command instanceof DeleteBannerPictureCommand).toBe(true);
    });
  });

  describe('DeleteProfilePictureCommand', () => {
    it('should create a DeleteBannerPictureCommand instance', () => {
      const command = new DeleteProfilePictureCommand('1');
      expect(command.fileId).toBe('1');
      expect(command instanceof DeleteProfilePictureCommand).toBe(true);
    });
  });

  describe('SaveBannerPictureCommand', () => {
    it('should create a DeleteBannerPictureCommand instance', () => {
      const command = new SaveBannerPictureCommand(mockMediaDto);
      expect(command.mediaDto.ownerId).toBe('1');
      expect(command.mediaDto.dataBuffer).toBe(mockMediaDto.dataBuffer);
      expect(command.mediaDto.fileName).toBe('top');
      expect(command instanceof SaveBannerPictureCommand).toBe(true);
    });
  });

  describe('SaveBannerPictureCommand', () => {
    it('should create a SaveBannerPictureCommand instance', () => {
      const command = new SaveBannerPictureCommand(mockMediaDto);
      expect(command.mediaDto.ownerId).toBe('1');
      expect(command.mediaDto.dataBuffer).toBe(mockMediaDto.dataBuffer);
      expect(command.mediaDto.fileName).toBe('top');
      expect(command instanceof SaveBannerPictureCommand).toBe(true);
    });
  });
});
