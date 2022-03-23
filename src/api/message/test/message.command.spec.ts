import { SaveMessageCommand } from '../cqrs/command/save-message.command';
import { User } from '../../user/domain/entities/user.entity';
import { UserType } from '../../user/domain/enum/user-type.enum';

describe('MessageCommand', () => {
  const mockUser1: User = new User();
  mockUser1.id = '1';
  mockUser1.email = 'user@email.com';
  mockUser1.username = 'billy';
  mockUser1.password = 'hash';
  mockUser1.userType = UserType.USER;

  describe('SaveMessageCommand', () => {
    it('should create a SaveMessageCommand instance', () => {
      const command = new SaveMessageCommand('test', mockUser1, '1');
      expect(command.content).toBe('test');
      expect(command.author).toBe(mockUser1);
      expect(command instanceof SaveMessageCommand).toBe(true);
    });
  });
});
