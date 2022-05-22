import { DeleteUserEvent } from '../cqrs/event/delete-user.event';
import { RemoveRefreshTokenEvent } from '../cqrs/event/remove-refresh-token.event';
import { SetCurrentRefreshTokenEvent } from '../cqrs/event/set-current-refresh-token.event';
import { UpdateUserEvent } from '../cqrs/event/update-user.event';

describe('UserEvent', () => {
  describe('DeleteUser', () => {
    it('should create a DeleteUser instance', () => {
      const event = new DeleteUserEvent('test');
      expect(event.userId).toBe('test');
      expect(event instanceof DeleteUserEvent).toBe(true);
    });
  });
  describe('RemoveRefreshTokenEvent', () => {
    it('should create a RemoveRefreshTokenEvent instance', () => {
      const event = new RemoveRefreshTokenEvent('test');
      expect(event.userId).toBe('test');
      expect(event instanceof RemoveRefreshTokenEvent).toBe(true);
    });
  });
  describe('SetCurrentRefreshTokenEvent', () => {
    it('should create a SetCurrentRefreshTokenEvent instance', () => {
      const event = new SetCurrentRefreshTokenEvent('test', '1');
      expect(event.userId).toBe('1');
      expect(event.refreshToken).toBe('test');
      expect(event instanceof SetCurrentRefreshTokenEvent).toBe(true);
    });
  });
  describe('UpdateUserEvent', () => {
    it('should create a UpdateUserEvent instance', () => {
      const event = new UpdateUserEvent('test');
      expect(event.userId).toBe('test');
      expect(event instanceof UpdateUserEvent).toBe(true);
    });
  });
});
