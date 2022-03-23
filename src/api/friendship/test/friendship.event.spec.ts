import { AcceptFriendshipRequestEvent } from '../cqrs/event/accept-friendship-request.event';
import { CancelFriendshipRequestEvent } from '../cqrs/event/cancel-friendship-request.event';
import { RemoveFriendshipEvent } from '../cqrs/event/remove-friendship.event';
import { SendFriendshipRequestEvent } from '../cqrs/event/send-friendship-request.event';

describe('FriendshipEvent', () => {
  describe('AcceptFriendshipRequestEvent', () => {
    it('should create a AcceptFriendshipRequestEvent instance', () => {
      const event = new AcceptFriendshipRequestEvent('test1', 'test2');
      expect(event.senderId).toBe('test1');
      expect(event.userId).toBe('test2');
      expect(event instanceof AcceptFriendshipRequestEvent).toBe(true);
    });
  });

  describe('CancelFriendshipRequestEvent', () => {
    it('should create a CancelFriendshipRequestEvent instance', () => {
      const event = new CancelFriendshipRequestEvent('test1', 'test2');
      expect(event.senderId).toBe('test1');
      expect(event.userId).toBe('test2');
      expect(event instanceof CancelFriendshipRequestEvent).toBe(true);
    });
  });

  describe('RemoveFriendshipEvent', () => {
    it('should create a RemoveFriendshipEvent instance', () => {
      const event = new RemoveFriendshipEvent('test1', 'test2');
      expect(event.senderId).toBe('test1');
      expect(event.userId).toBe('test2');
      expect(event instanceof RemoveFriendshipEvent).toBe(true);
    });
  });

  describe('SendFriendshipRequestEvent', () => {
    it('should create a SendFriendshipRequestEvent instance', () => {
      const event = new SendFriendshipRequestEvent('test1', 'test2');
      expect(event.senderId).toBe('test1');
      expect(event.userId).toBe('test2');
      expect(event instanceof SendFriendshipRequestEvent).toBe(true);
    });
  });
});
