import { FriendshipController } from '../friendship.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { FriendshipService } from '../friendship.service';
import {
  mockedFriendship,
  mockedFriendshipList,
  mockerFriendshipRequest,
} from '../../../util/mocks/dto/friendship.dto.mock';
import { FriendshipStatus } from '../domain/enum/friendship-status.enum';
import { User } from '../../user/domain/entities/user.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpMocks = require('node-mocks-http');

describe('FriendshipController', () => {
  let friendshipController: FriendshipController;
  const mockRequest = httpMocks.createRequest();
  mockRequest.user = new User();
  mockRequest.user.id = '1';

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FriendshipController],
      providers: [
        {
          provide: FriendshipService,
          useValue: {
            sentFriendshipRequest: async () => mockedFriendshipList,
            receivedFriendshipRequest: async () => mockedFriendshipList,
            statusFriendship: async () => FriendshipStatus.NONE,
            sendFriendshipRequest: async () => mockerFriendshipRequest,
            acceptFriendshipRequest: async () => mockedFriendship,
            cancelFriendshipRequest: async () => undefined,
            rejectFriendshipRequest: async () => undefined,
            removeFriendship: async () => undefined,
          },
        },
      ],
    }).compile();

    friendshipController = app.get<FriendshipController>(FriendshipController);
  });

  it('should be defined', () => {
    expect(friendshipController).toBeDefined();
  });

  describe('sentFriendshipRequest', () => {
    it('should return friendship request tab', async () => {
      expect(
        await friendshipController.sentFriendshipRequest(mockRequest),
      ).toBe(mockedFriendshipList);
    });
  });

  describe('receivedFriendshipRequest', () => {
    it('should return friendship request tab', async () => {
      expect(
        await friendshipController.receivedFriendshipRequest(mockRequest),
      ).toBe(mockedFriendshipList);
    });
  });

  describe('statusFriendship', () => {
    it('should return friendshipStatus', async () => {
      expect(await friendshipController.statusFriendship(mockRequest, '')).toBe(
        FriendshipStatus.NONE,
      );
    });
  });

  describe('sendFriendshipRequest', () => {
    it('should return friendshipRequest', async () => {
      expect(
        await friendshipController.sendFriendshipRequest(mockRequest, ''),
      ).toBe(mockerFriendshipRequest);
    });
  });

  describe('acceptFriendshipRequest', () => {
    it('should return new friendship', async () => {
      expect(
        await friendshipController.acceptFriendshipRequest(mockRequest, ''),
      ).toBe(mockedFriendship);
    });
  });

  describe('cancelFriendshipRequest', () => {
    it('should return nothing', async () => {
      expect(
        await friendshipController.cancelFriendshipRequest(mockRequest, ''),
      ).toBe(undefined);
    });
  });

  describe('rejectFriendshipRequest', () => {
    it('should return nothing', async () => {
      expect(
        await friendshipController.rejectFriendshipRequest(mockRequest, ''),
      ).toBe(undefined);
    });
  });

  describe('removeFriendship', () => {
    it('should return nothing', async () => {
      expect(await friendshipController.removeFriendship(mockRequest, '')).toBe(
        undefined,
      );
    });
  });
});
