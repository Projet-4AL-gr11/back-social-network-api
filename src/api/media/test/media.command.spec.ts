import { SaveBannerPictureCommand } from '../cqrs/command/save-banner-picture.command';
import { MediaDto } from '../domain/dto/media.dto';
import { DeletePictureCommand } from '../cqrs/command/delete-picture.command';
import { SaveEventPictureCommand } from '../cqrs/command/save-event-picture.command';
import { SaveGroupPictureCommand } from '../cqrs/command/save-group-picture.command';

describe('MediaCommand', () => {
  const mockMediaDto = new MediaDto(Buffer.alloc(10, '1'), '1', 'top');
  describe('DeletePictureCommand', () => {
    it('should create a DeletePictureCommand instance', () => {
      const command = new DeletePictureCommand('1');
      expect(command.fileId).toBe('1');
      expect(command instanceof DeletePictureCommand).toBe(true);
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

  describe('SaveEventPictureCommand', () => {
    it('should create a SaveEventPictureCommand instance', () => {
      const command = new SaveEventPictureCommand(mockMediaDto);
      expect(command.mediaDto.ownerId).toBe('1');
      expect(command.mediaDto.dataBuffer).toBe(mockMediaDto.dataBuffer);
      expect(command.mediaDto.fileName).toBe('top');
      expect(command instanceof SaveEventPictureCommand).toBe(true);
    });
  });

  describe('SaveGroupPictureCommand', () => {
    it('should create a SaveGroupPictureCommand instance', () => {
      const command = new SaveGroupPictureCommand(mockMediaDto);
      expect(command.mediaDto.ownerId).toBe('1');
      expect(command.mediaDto.dataBuffer).toBe(mockMediaDto.dataBuffer);
      expect(command.mediaDto.fileName).toBe('top');
      expect(command instanceof SaveGroupPictureCommand).toBe(true);
    });
  });
});
