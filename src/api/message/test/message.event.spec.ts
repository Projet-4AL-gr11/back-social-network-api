import { SaveMessageEvent } from '../cqrs/event/save-message.event';

describe('MessageEvent', () => {
  describe('SaveMessageEvent', () => {
    it('should create a SaveMessageEvent instance', () => {
      const event = new SaveMessageEvent('1', 'test');
      expect(event.authorId).toBe('1');
      expect(event.content).toBe('test');
      expect(event instanceof SaveMessageEvent).toBe(true);
    });
  });
});
