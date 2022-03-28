import { UserService } from '../user.service';
import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserResponse } from '../domain/response/user.response';
import { UserType } from '../domain/enum/user-type.enum';
import { UserListResponse } from '../domain/response/user-list.response';
import { UserDto } from '../domain/dto/user.dto';

describe('UserService', () => {
  let service: UserService;
  let commandBus: jest.Mock;
  let queryBus: jest.Mock;
  const user1 = new UserResponse('1', 'Billy', 'user@email.com', UserType.USER);
  const user2 = new UserResponse(
    '2',
    'Billy2',
    'user2@email.com',
    UserType.USER,
  );
  const mockedUserListResponse = new UserListResponse([user1, user2]);
  const mockUserDto: UserDto = {
    ...{
      id: '1',
      email: 'user@email.com',
      username: 'Billy',
      password: 'hash',
      userType: UserType.USER,
    },
  };

  beforeEach(async () => {
    commandBus = jest.fn().mockResolvedValue('');
    queryBus = jest.fn().mockResolvedValue('');
    const modRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: CommandBus,
          useValue: {
            execute: commandBus,
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: queryBus,
          },
        },
      ],
    }).compile();
    service = modRef.get(UserService);
  });

  describe('Remove', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(undefined);
    });
    it('should return nothing', async () => {
      expect(await service.remove('1')).toEqual(undefined);
    });
  });

  describe('FindAll', () => {
    beforeEach(async () => {
      queryBus.mockResolvedValue(mockedUserListResponse);
    });
    it('should return many user', async () => {
      expect(await service.findAll()).toEqual(mockedUserListResponse);
    });
  });

  describe('FindOne', () => {
    beforeEach(async () => {
      queryBus.mockResolvedValue(user1);
    });
    it('should return user', async () => {
      expect(await service.findOne('1')).toEqual(user1);
    });
  });

  describe('Update', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(user1);
    });
    it('should return updated user', async () => {
      expect(await service.update('1', mockUserDto)).toEqual(user1);
    });
  });

  describe('RemoveRefreshToken', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(undefined);
    });
    it('should return nothing', async () => {
      expect(await service.removeRefreshToken('1')).toEqual(undefined);
    });
  });

  describe('set-current-refresh-token', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(undefined);
    });
    it('should return nothing', async () => {
      expect(await service.setCurrentRefreshToken('token', '1')).toEqual(
        undefined,
      );
    });
  });

  describe('get-user-if-refresh-token-match', () => {
    beforeEach(async () => {
      queryBus.mockResolvedValue(user1);
    });
    it('should return user', async () => {
      expect(await service.getUserIfRefreshTokenMatches('test', '1')).toEqual(
        user1,
      );
    });
  });
});
