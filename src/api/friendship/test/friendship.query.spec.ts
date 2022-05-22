import { GetSentFriendshipRequestQuery } from '../cqrs/query/get-sent-friendship-request.query';
import { GetStatusFriendshipQuery } from '../cqrs/query/get-status-friendship.query';

describe('FriendshipQuery', () => {
  describe('GetSentFriendshipRequestQuery', () => {
    it('should create a GetSentFriendshipRequestQuery instance', () => {
      const event = new GetSentFriendshipRequestQuery('test1');
      expect(event.userId).toBe('test1');
      expect(event instanceof GetSentFriendshipRequestQuery).toBe(true);
    });
  });

  describe('GetSentFriendshipRequestQuery', () => {
    it('should create a GetSentFriendshipRequestQuery instance', () => {
      const event = new GetSentFriendshipRequestQuery('test1');
      expect(event.userId).toBe('test1');
      expect(event instanceof GetSentFriendshipRequestQuery).toBe(true);
    });
  });

  describe('GetStatusFriendshipQuery', () => {
    it('should create a GetStatusFriendshipQuery instance', () => {
      const event = new GetStatusFriendshipQuery('test1', 'test2');
      expect(event.currentUser).toBe('test1');
      expect(event.user).toBe('test2');
      expect(event instanceof GetStatusFriendshipQuery).toBe(true);
    });
  });
});
