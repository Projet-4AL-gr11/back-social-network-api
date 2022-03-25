import { CreateLanguageEvent } from '../cqrs/event/create-language.event';
import { DeleteLanguageEvent } from '../cqrs/event/delete-language.event';
import { UpdateLanguageEvent } from '../cqrs/event/update-language.event';

describe('LanguageEvent', () => {
  describe('CreateLanguageEvent', () => {
    it('should create a CreateLanguageEvent', () => {
      const event = new CreateLanguageEvent('test');
      expect(event.name).toBe('test');
      expect(event instanceof CreateLanguageEvent).toBe(true);
    });
  });
  describe('DeleteLanguageEvent', () => {
    it('should create a DeleteLanguageEvent', () => {
      const event = new DeleteLanguageEvent('test');
      expect(event.id).toBe('test');
      expect(event instanceof DeleteLanguageEvent).toBe(true);
    });
  });
  describe('UpdateLanguageEvent', () => {
    it('should create a UpdateLanguageEvent', () => {
      const event = new UpdateLanguageEvent('test');
      expect(event.id).toBe('test');
      expect(event instanceof UpdateLanguageEvent).toBe(true);
    });
  });
});
