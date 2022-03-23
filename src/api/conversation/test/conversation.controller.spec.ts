import { ConversationController } from '../conversation.controller';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpMocks = require('node-mocks-http');
import { User } from '../../user/domain/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { ConversationService } from '../conversation.service';
import { UserType } from '../../user/domain/enum/user-type.enum';
import { Conversation } from '../domain/entities/conversation.entity';

describe('ConversationController', () => {
  let conversationController: ConversationController;
  const mockRequest = httpMocks.createRequest();
  mockRequest.user = new User();
  mockRequest.user.id = '1';

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
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ConversationController],
      providers: [
        {
          provide: ConversationService,
          useValue: {
            getMembers: async () => [mockUser1, mockUser2],
            getConversationWithId: async () => mockConversation,
          },
        },
      ],
    }).compile();

    conversationController = app.get<ConversationController>(
      ConversationController,
    );
  });

  it('should be defined', () => {
    expect(conversationController).toBeDefined();
  });

  describe('getMembers', () => {
    it('should return list of user', async () => {
      expect(await conversationController.getMembers('1')).toEqual([
        mockUser1,
        mockUser2,
      ]);
    });
  });

  describe('getConversationById', () => {
    it('should return a conversation', async () => {
      expect(await conversationController.findOne('1')).toEqual(
        mockConversation,
      );
    });
  });
});
