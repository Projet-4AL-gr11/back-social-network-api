import { LanguageDto } from '../domain/dto/language.dto';
import { CreateLanguageCommand } from '../cqrs/command/create-language.command';
import { DeleteLanguageCommand } from '../cqrs/command/delete-language.command';
import { UpdateLanguageCommand } from '../cqrs/command/update-language.command';

describe('LanguageCommand', () => {
  const mockLanguageDto = new LanguageDto('test');
  describe('CreateLanguageCommand', () => {
    it('should create a CreateLanguageCommand instance', () => {
      const command = new CreateLanguageCommand(mockLanguageDto);
      expect(command.languageDto.name).toBe('test');
      expect(command instanceof CreateLanguageCommand).toBe(true);
    });
  });

  describe('DeleteLanguageCommand', () => {
    it('should create a DeleteLanguageCommand instance', () => {
      const command = new DeleteLanguageCommand('test');
      expect(command.id).toBe('test');
      expect(command instanceof DeleteLanguageCommand).toBe(true);
    });
  });

  describe('UpdateLanguageCommand', () => {
    it('should create a UpdateLanguageCommand instance', () => {
      const command = new UpdateLanguageCommand('test', mockLanguageDto);
      expect(command.id).toBe('test');
      expect(command.languageDto).toBe(mockLanguageDto);
      expect(command instanceof UpdateLanguageCommand).toBe(true);
    });
  });
});
