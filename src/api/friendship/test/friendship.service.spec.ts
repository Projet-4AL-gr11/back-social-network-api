import { FriendshipService } from '../friendship.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import {
  mockedFriendship,
  mockedFriendshipList,
  mockerFriendshipRequest,
} from '../../../util/mocks/dto/friendship.dto.mock';
import { FriendshipStatus } from '../domain/enum/friendship-status.enum';

describe('FriendshipService', () => {
  let service: FriendshipService;
  let commandBus: jest.Mock;
  let queryBus: jest.Mock;

  beforeEach(async () => {
    commandBus = jest.fn().mockResolvedValue('');
    queryBus = jest.fn().mockResolvedValue('');
    const modRef = await Test.createTestingModule({
      providers: [
        FriendshipService,
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
    service = modRef.get(FriendshipService);
  });

  describe('sentFriendshipRequest', () => {
    beforeEach(async () => {
      queryBus.mockResolvedValue(mockedFriendshipList);
    });
    it('should return friendship request tab', async () => {
      expect(await service.sentFriendshipRequest({ userId: '' })).toBe(
        mockedFriendshipList,
      );
    });
  });

  describe('receivedFriendshipRequest', () => {
    beforeEach(async () => {
      queryBus.mockResolvedValue(mockedFriendshipList);
    });
    it('should return friendship request tab', async () => {
      expect(await service.receivedFriendshipRequest({ userId: '' })).toBe(
        mockedFriendshipList,
      );
    });
  });

  describe('statusFriendship', () => {
    beforeEach(async () => {
      queryBus.mockResolvedValue(FriendshipStatus.NONE);
    });
    it('should return friendshipStatus', async () => {
      expect(await service.statusFriendship({ senderId: '', userId: '' })).toBe(
        FriendshipStatus.NONE,
      );
    });
  });

  describe('sendFriendshipRequest', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(mockerFriendshipRequest);
    });
    it('should return friendshipRequest', async () => {
      expect(
        await service.sendFriendshipRequest({ senderId: '', userId: '' }),
      ).toBe(mockerFriendshipRequest);
    });
  });

  describe('acceptFriendshipRequest', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(mockedFriendship);
    });
    it('should return new friendship', async () => {
      expect(
        await service.acceptFriendshipRequest({ senderId: '', userId: '' }),
      ).toBe(mockedFriendship);
    });
  });

  describe('cancelFriendshipRequest', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(undefined);
    });
    it('should return nothing', async () => {
      expect(
        await service.cancelFriendshipRequest({ senderId: '', userId: '' }),
      ).toBe(undefined);
    });
  });

  describe('rejectFriendshipRequest', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(undefined);
    });
    it('should return nothing', async () => {
      expect(
        await service.rejectFriendshipRequest({ senderId: '', userId: '' }),
      ).toBe(undefined);
    });
  });

  describe('removeFriendship', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(undefined);
    });
    it('should return nothing', async () => {
      expect(await service.removeFriendship({ senderId: '', userId: '' })).toBe(
        undefined,
      );
    });
  });
});
