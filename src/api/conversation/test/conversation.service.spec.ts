import { ConversationService } from '../conversation.service';
import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { User } from '../../user/domain/entities/user.entity';
import { UserType } from '../../user/domain/enum/user-type.enum';
import { Conversation } from '../domain/entities/conversation.entity';

describe('ConversationService', () => {
  let service: ConversationService;
  let commandBus: jest.Mock;
  let queryBus: jest.Mock;
  const mockUser1: User = new User();
  mockUser1.id = '1';
  mockUser1.email = 'user@email.com';
  mockUser1.username = 'billy';
  mockUser1.password = 'hash';
  mockUser1.userType = UserType.USER;

  const mockUser2: User = new User();
  mockUser2.id = '2';
  mockUser2.email = 'user2@email.com';
  mockUser2.username = 'billy2';
  mockUser2.password = 'hash';
  mockUser2.userType = UserType.USER;

  const mockConversation: Conversation = new Conversation();
  mockConversation.id = '1';
  mockConversation.messages = [];
  mockConversation.friendship = undefined;
  mockConversation.createdAt = undefined;

  beforeEach(async () => {
    commandBus = jest.fn().mockResolvedValue('');
    queryBus = jest.fn().mockResolvedValue('');
    const modRef = await Test.createTestingModule({
      providers: [
        ConversationService,
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
    service = modRef.get(ConversationService);
  });

  describe('getMembers', () => {
    describe('when  there is value', () => {
      beforeEach(async () => {
        queryBus.mockResolvedValue(mockUser1);
      });
      it('should return list of User', async () => {
        expect(await service.getMembers('1')).toStrictEqual([
          mockUser1,
          mockUser1,
          mockUser1,
        ]);
      });
    });
    describe('when  there is no value', () => {
      beforeEach(async () => {
        queryBus.mockResolvedValue(undefined);
      });
      it('should return empty list', async () => {
        expect(await service.getMembers('1')).toStrictEqual([
          undefined,
          undefined,
          undefined,
        ]);
      });
    });
  });

  describe('getConversationByid', () => {
    beforeEach(async () => {
      queryBus.mockResolvedValue(mockConversation);
    });
    it('should return a conversation', async () => {
      expect(await service.getConversationWithId('1')).toBe(mockConversation);
    });
  });

  describe('isMember', () => {
    beforeEach(async () => {
      queryBus.mockResolvedValue(mockUser1);
    });
    it('should return true', async () => {
      expect(await service.isMemberOfConversation('1', '1')).toStrictEqual(
        true,
      );
    });
    it('should return false', async () => {
      expect(await service.isMemberOfConversation('2', '1')).toStrictEqual(
        false,
      );
    });
  });
});
