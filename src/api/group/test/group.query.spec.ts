import { GetGroupQuery } from '../cqrs/query/get-group.query';
import { GetGroupMembershipWithUserIdQuery } from '../cqrs/query/get-group-membership-with-user-id.query';

describe('GroupQuery', () => {
  describe('GetGroupQuery', () => {
    it('should return GetGroupQuery instance', () => {
      const query = new GetGroupQuery();
      expect(query instanceof GetGroupQuery).toBe(true);
    });
    it('should return GetGroupQuery instance with id', () => {
      const query = new GetGroupQuery('1');
      expect(query.groupId).toBe('1');
      expect(query instanceof GetGroupQuery).toBe(true);
    });
  });

  describe('GetGroupMembershipWithUserIdQuery', () => {
    it('should return GetGroupMembershipWithUserIdQuery instance', () => {
      const query = new GetGroupMembershipWithUserIdQuery('1');
      expect(query.userId).toBe('1');
      expect(query instanceof GetGroupMembershipWithUserIdQuery).toBe(true);
    });
  });
});
