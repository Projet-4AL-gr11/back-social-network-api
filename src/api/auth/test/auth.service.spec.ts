import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from '../../user/domain/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockedJwtService } from '../../../util/mocks/jwt.service.mock';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mockedConfigService } from '../../../util/mocks/config.service.mock';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { UserRepositoryMock } from '../../../util/mocks/repository/user.repository.mock';
import { UserType } from '../../user/domain/enum/user-type.enum';
import { UserDto } from '../../user/domain/dto/user.dto';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';

config();

describe('AuthService', () => {
  let app: TestingModule;
  let service: AuthService;
  let bcryptCompare: jest.Mock;
  let userData: UserDto;
  let findOneOrFail: jest.Mock;
  let commandBus: jest.Mock;

  const mockedUser: UserDto = {
    ...{
      id: '1',
      email: 'user@email.com',
      username: 'John',
      password: 'hash',
      userType: UserType.USER,
    },
  };
  beforeEach(async () => {
    commandBus = jest.fn().mockResolvedValue('');

    userData = {
      ...mockedUser,
    };
    findOneOrFail = jest.fn().mockResolvedValue(userData);
    const usersRepository = {
      findOneOrFail: findOneOrFail,
    };
    app = await Test.createTestingModule({
      imports: [
        CqrsModule,
        UserRepositoryMock,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_EXPIRATION_TIME,
          },
        }),
        ConfigModule,
      ],
      providers: [
        AuthService,
        {
          provide: CommandBus,
          useValue: {
            execute: commandBus,
          },
        },
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();

    service = await app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = '1';
      expect(typeof service.getCookieWithJwtToken(userId)).toEqual('string');
    });
    it('should return a string', () => {
      const userId = '1';
      expect(typeof service.getCookieWithJwtRefreshToken(userId)).toEqual(
        'string',
      );
    });
  });

  describe('when registering', () => {
    describe('sign-up', () => {
      beforeEach(() => {
        commandBus.mockResolvedValue(mockedUser);
      });
      it('should  return with registered user', async () => {
        expect(
          await service.signup({
            username: 'jhon',
            email: 'user@email.com',
            password: 'hash',
          }),
        ).toEqual(userData);
      });
    });

    it('should return true ', async () => {
      const plainText = '1234';
      const hash = await bcrypt.hash('1234', 10);
      expect(await service.verifyPassword(plainText, hash)).toEqual(true);
    });

    it('should return false ', async () => {
      const plainText = '4567';
      const hash = await bcrypt.hash('1234', 10);
      expect(await service.verifyPassword(plainText, hash)).toEqual(false);
    });
  });

  describe('when log-out', () => {
    it('should return a string', () => {
      expect(service.getCookieForLogOut()).toEqual([
        'Authentication=; HttpOnly; Path=/; Max-Age=0',
        'Refresh=; HttpOnly; Path=/; Max-Age=0',
      ]);
    });
  });

  describe('The login', () => {
    beforeEach(() => {
      bcryptCompare = jest.fn().mockReturnValue(true);
      (bcrypt.compare as jest.Mock) = bcryptCompare;
    });

    describe('when accessing the data of authenticating user', () => {
      describe('and the provided password is not valid', () => {
        beforeEach(() => {
          bcryptCompare.mockReturnValue(false);
        });
        it('should throw an error', async () => {
          await expect(
            service.login('John', 'strongPassword'),
          ).rejects.toThrow();
        });
      });
      describe('and the provided password is valid', () => {
        beforeEach(() => {
          bcryptCompare.mockReturnValue(true);
        });
        describe('and the user is found in the database', () => {
          beforeEach(() => {
            findOneOrFail.mockResolvedValue(userData);
            commandBus.mockResolvedValue(userData);
          });
          it('should return the user data', async () => {
            const user = await service.login('John', 'hash');
            expect(user).toBe(userData);
          });
        });
        describe('and the user is not found in the database', () => {
          beforeEach(() => {
            findOneOrFail.mockResolvedValue(undefined);
          });
          it('should throw an error', async () => {
            await expect(service.login('John', 'hash')).rejects.toThrow();
          });
        });
      });
    });
  });
});
