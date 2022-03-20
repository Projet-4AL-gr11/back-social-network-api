import { RegisterEvent } from '../cqrs/event/register.event';
import { User } from '../../user/domain/entities/user.entity';
import { UserType } from '../../user/domain/enum/user-type.enum';

describe('AuthEvent', () => {
  let mockedUser: User;

  beforeAll(() => {
    mockedUser = new User();
    mockedUser.id = '1';
    mockedUser.email = 'user@email.com';
    mockedUser.username = 'billy';
    mockedUser.password = 'hash';
    mockedUser.userType = UserType.USER;
  });
  describe('RegisterEvent', () => {
    it('should create a RegisterEvent instance', () => {
      const event = new RegisterEvent(mockedUser);
      expect(event.user).toBe(mockedUser);
      expect(event instanceof RegisterEvent).toBe(true);
    });
  });
});
