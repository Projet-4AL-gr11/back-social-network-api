import { GetConversationByIdQuery } from '../cqrs/query/get-conversation-by-id.query';
import { GetMembersFriendOneQuery } from '../cqrs/query/get-members-friend-one.query';
import { GetMembersFriendTwoQuery } from '../cqrs/query/get-members-friend-two.query';

describe('ConversationQuey', () => {
  describe('GetConversationByIdQuery', () => {
    it('should create a GetConversationByIdQuery instance', () => {
      const query = new GetConversationByIdQuery('1');
      expect(query.conversationId).toBe('1');
      expect(query instanceof GetConversationByIdQuery).toBe(true);
    });
  });
  describe('GetMembersFriendOneQuery', () => {
    it('should create a GetMembersFriendOneQuery instance', () => {
      const query = new GetMembersFriendOneQuery('1');
      expect(query.conversationId).toBe('1');
      expect(query instanceof GetMembersFriendOneQuery).toBe(true);
    });
  });
  describe('GetMembersFriendTwoQuery', () => {
    it('should create a GetMembersFriendTwoQuery instance', () => {
      const query = new GetMembersFriendTwoQuery('1');
      expect(query.conversationId).toBe('1');
      expect(query instanceof GetMembersFriendTwoQuery).toBe(true);
    });
  });
});
