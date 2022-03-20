import { RegisterEventHandler } from '../cqrs/event-handler/register.event-handler';
import { Test } from '@nestjs/testing';
import { logger } from '../../../util/config/winston-logger.config';
import { UserType } from '../../user/domain/enum/user-type.enum';
import { User } from '../../user/domain/entities/user.entity';

describe('AuthEventHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  let mockedUser: User;

  beforeAll(() => {
    mockedUser = new User();
    mockedUser.id = '1';
    mockedUser.email = 'user@email.com';
    mockedUser.username = 'billy';
    mockedUser.password = 'hash';
    mockedUser.userType = UserType.USER;
  });

  describe('RegisterEventHandler', () => {
    let handler: RegisterEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [RegisterEventHandler],
      }).compile();
      handler = mod.get(RegisterEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ user: mockedUser });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });
});
