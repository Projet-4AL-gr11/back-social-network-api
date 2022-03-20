import { AcceptFriendshipRequestCommand } from '../cqrs/command/accept-friendship-request.command';
import { mockUser1, mockUser2 } from '../../../util/mocks/dto/user.dto.mock';
import { CancelFriendshipRequestCommand } from '../cqrs/command/cancel-friendship-request.command';
import { RemoveFriendshipCommand } from '../cqrs/command/remove-friendship.command';
import { SendFriendshipRequestCommand } from '../cqrs/command/send-friendship-request.command';

describe('FriendshipCommand', () => {
  describe('AcceptFriendshipRequestCommand', () => {
    it('should create a AcceptFriendshipRequestCommand instance', () => {
      const command = new AcceptFriendshipRequestCommand(mockUser1, mockUser2);
      expect(command.friendOne).toBe(mockUser1);
      expect(command.friendTwo).toBe(mockUser2);
      expect(command instanceof AcceptFriendshipRequestCommand).toBe(true);
    });
  });

  describe('CancelFriendshipRequestCommand', () => {
    it('should create a CancelFriendshipRequestCommand instance', () => {
      const command = new CancelFriendshipRequestCommand('test1', 'test2');
      expect(command.sender).toBe('test1');
      expect(command.userId).toBe('test2');
      expect(command instanceof CancelFriendshipRequestCommand).toBe(true);
    });
  });

  describe('RemoveFriendshipCommand', () => {
    it('should create a RemoveFriendshipCommand instance', () => {
      const command = new RemoveFriendshipCommand('test1', 'test2');
      expect(command.friendOne).toBe('test1');
      expect(command.friendTwo).toBe('test2');
      expect(command instanceof RemoveFriendshipCommand).toBe(true);
    });
  });

  describe('SendFriendshipRequestCommand', () => {
    it('should create a SendFriendshipRequestCommand instance', () => {
      const command = new SendFriendshipRequestCommand(mockUser1, mockUser2);
      expect(command.sender).toBe(mockUser1);
      expect(command.user).toBe(mockUser2);
      expect(command instanceof SendFriendshipRequestCommand).toBe(true);
    });
  });
});
