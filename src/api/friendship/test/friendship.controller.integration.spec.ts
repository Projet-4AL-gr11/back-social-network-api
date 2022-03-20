import { INestApplication, ValidationPipe } from '@nestjs/common';
import { UserDto } from '../../user/domain/dto/user.dto';
import { mockedUserList } from '../../../util/mocks/dto/user.dto.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { mockedConfigService } from '../../../util/mocks/config.service.mock';
import { JwtService } from '@nestjs/jwt';
import { mockedJwtService } from '../../../util/mocks/jwt.service.mock';
import { JwtStrategy } from '../../auth/strategy/jwt.strategy';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../user/domain/entities/user.entity';
import JwtAuthenticationGuard from '../../auth/guards/jwt-auth.guard';
import { FriendshipController } from '../friendship.controller';
import { AcceptFriendshipRequestHandler } from '../cqrs/handler/accept-friendship-request.handler';
import { CancelFriendshipRequestHandler } from '../cqrs/handler/cancel-friendship-request.handler';
import { RemoveFriendshipHandler } from '../cqrs/handler/remove-friendship.handler';
import { SendFriendshipRequestHandler } from '../cqrs/handler/send-friendship-request.handler';
import { Friendship } from '../domain/entities/friendship.entity';
import { FriendshipRequest } from '../domain/entities/friendship-request.entity';
import {
  mockedFriendship,
  mockedFriendshipRequestReceived,
  mockedFriendshipRequestReceivedList,
  mockedFriendshipRequestSent,
  mockedFriendshipRequestSentList,
} from '../../../util/mocks/dto/friendship.dto.mock';
import * as request from 'supertest';
import { FriendshipStatus } from '../domain/enum/friendship-status.enum';
import { GetStatusFriendshipHandler } from '../cqrs/handler/get-status-friendship.handler';
import { GetReceivedFriendshipHandler } from '../cqrs/handler/get-received-friendship.handler';
import { GetSentFriendshipRequestHandler } from '../cqrs/handler/get-sent-friendship-request.handler';
import { AppModule } from '../../../app.module';
import { FriendshipService } from "../friendship.service";

describe('FriendshipControllerIntegration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  let userData: UserDto[];
  let findOneOrFailUser: jest.Mock;
  let createQueryBuilderFriendship: jest.Mock;
  let createQueryBuilderFriendshipRequest: jest.Mock;

  beforeEach(async () => {
    userData = mockedUserList;
    findOneOrFailUser = jest.fn().mockResolvedValue(userData);
    createQueryBuilderFriendship = jest.fn().mockResolvedValue(userData);
    createQueryBuilderFriendshipRequest = jest.fn().mockResolvedValue(userData);
    const userRepository = {
      findOneOrFail: findOneOrFailUser,
    };
    const friendshipRepository = {
      create: jest.fn().mockResolvedValue(userData),
      remove: jest.fn().mockResolvedValue(undefined),
      createQueryBuilder: createQueryBuilderFriendship,
      save: jest.fn().mockReturnValue(Promise.resolve()),
    };
    const friendshipRequestRepository = {
      create: jest.fn().mockResolvedValue(mockedFriendship),
      save: jest.fn().mockReturnValue(Promise.resolve()),
      createQueryBuilder: createQueryBuilderFriendshipRequest,
      delete: jest.fn().mockResolvedValue(undefined),
      remove: jest.fn().mockResolvedValue(undefined),
    };

    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [FriendshipController],
      providers: [
        FriendshipService,
        AcceptFriendshipRequestHandler,
        CancelFriendshipRequestHandler,
        RemoveFriendshipHandler,
        SendFriendshipRequestHandler,
        GetStatusFriendshipHandler,
        GetReceivedFriendshipHandler,
        GetSentFriendshipRequestHandler,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: JwtStrategy,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
        {
          provide: getRepositoryToken(Friendship),
          useValue: friendshipRepository,
        },
        {
          provide: getRepositoryToken(FriendshipRequest),
          useValue: friendshipRequestRepository,
        },
      ],
    })
      .overrideGuard(JwtAuthenticationGuard)
      .useValue({})
      .compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('when get ', () => {
    describe('friendship status', () => {
      describe('BEFRIENDED', () => {
        beforeEach(() => {
          createQueryBuilderFriendship.mockResolvedValue(mockedFriendship);
          createQueryBuilderFriendshipRequest.mockResolvedValue(undefined);
        });
        it('should respond friendshipStatus.BEFRIENDED', () => {
          return request(app.getHttpServer())
            .get('1/friendship-status')
            .expect(FriendshipStatus.BEFRIENDED);
        });
      });
      describe('PENDING', () => {
        beforeEach(() => {
          createQueryBuilderFriendship.mockResolvedValue(undefined);
          createQueryBuilderFriendshipRequest.mockResolvedValue(
            mockedFriendshipRequestSent,
          );
        });
        it('should respond FriendshipStatus.PENDING', () => {
          return request(app.getHttpServer())
            .get('1/friendship-status')
            .expect(FriendshipStatus.PENDING);
        });
      });
      describe('RECEIVED', () => {
        beforeEach(() => {
          createQueryBuilderFriendship.mockResolvedValue(undefined);
          createQueryBuilderFriendshipRequest.mockResolvedValue(
            mockedFriendshipRequestReceived,
          );
        });
        it('should respond FriendshipStatus.PENDING', () => {
          return request(app.getHttpServer())
            .get('1/friendship-status')
            .expect(FriendshipStatus.RECEIVED);
        });
      });
      describe('NONE', () => {
        beforeEach(() => {
          createQueryBuilderFriendship.mockResolvedValue(undefined);
          createQueryBuilderFriendshipRequest.mockResolvedValue(undefined);
        });
        it('should respond FriendshipStatus.NONE', () => {
          return request(app.getHttpServer())
            .get('1/friendship-status')
            .expect(FriendshipStatus.NONE);
        });
      });
    });

    describe('sent friendshipRequest', () => {
      describe('With valid data', () => {
        beforeEach(() => {
          createQueryBuilderFriendshipRequest.mockResolvedValue(
            mockedFriendshipRequestSentList,
          );
        });
        it('should respond with friendship request', () => {
          const expectedData = mockedFriendshipRequestSentList;
          return request(app.getHttpServer())
            .get('sent-friendship-request')
            .expect(expectedData);
        });
      });
      describe('With invalid data', () => {
        beforeEach(() => {
          createQueryBuilderFriendshipRequest.mockResolvedValue(undefined);
        });
        it('should respond with empty array', () => {
          const expectedData = [];
          return request(app.getHttpServer())
            .get('sent-friendship-request')
            .expect(expectedData);
        });
      });
    });

    describe('received friendshipRequest', () => {
      describe('With valid data', () => {
        beforeEach(() => {
          createQueryBuilderFriendshipRequest.mockResolvedValue(
            mockedFriendshipRequestReceivedList,
          );
        });
        it('should respond with friendship request', () => {
          const expectedData = mockedFriendshipRequestReceivedList;
          return request(app.getHttpServer())
            .get('received-friendship-request')
            .expect(expectedData);
        });
      });
      describe('With invalid data', () => {
        beforeEach(() => {
          createQueryBuilderFriendshipRequest.mockResolvedValue(undefined);
        });
        it('should respond with empty array', () => {
          const expectedData = [];
          return request(app.getHttpServer())
            .get('received-friendship-request')
            .expect(expectedData);
        });
      });
    });
  });

  describe('with command friendshipRequest', () => {
    describe('accept friendshipRequest', () => {
      describe('With valid data', () => {
        beforeEach(() => {
          createQueryBuilderFriendshipRequest.mockResolvedValue(
            mockedFriendship,
          );
        });
        it('should respond with friendshiprequest', () => {
          const expectedData = mockedFriendship;
          return request(app.getHttpServer()).post('1').expect(expectedData);
        });
      });
      describe('With invalid data', () => {
        beforeEach(() => {
          findOneOrFailUser.mockResolvedValue(undefined);
          createQueryBuilderFriendshipRequest.mockResolvedValue(undefined);
        });
        it('should respond with error', () => {
          return request(app.getHttpServer()).post('1').expect(500);
        });
      });
    });

    describe('cancel friendshipRequest', () => {
      describe('With valid data', () => {
        beforeEach(() => {
          createQueryBuilderFriendshipRequest.mockResolvedValue(
            mockedFriendship,
          );
        });
        it('should respond with 200 status', () => {
          return request(app.getHttpServer()).delete('1/cancel').expect(200);
        });
      });
      describe('With invalid data', () => {
        beforeEach(() => {
          createQueryBuilderFriendshipRequest.mockResolvedValue(undefined);
        });
        it('should respond with error', () => {
          expect(
            request(app.getHttpServer()).delete('0/cancel'),
          ).rejects.toThrow();
        });
      });
    });

    describe('reject friendshipRequest', () => {
      describe('With valid data', () => {
        beforeEach(() => {
          createQueryBuilderFriendshipRequest.mockResolvedValue(
            mockedFriendship,
          );
        });
        it('should respond with 200 status', () => {
          return request(app.getHttpServer()).delete('1/reject').expect(200);
        });
      });
      describe('With invalid data', () => {
        beforeEach(() => {
          createQueryBuilderFriendshipRequest.mockResolvedValue(undefined);
        });
        it('should respond with error', () => {
          expect(
            request(app.getHttpServer()).delete('0/reject'),
          ).rejects.toThrow();
        });
      });
    });

    describe('remove friendship', () => {
      describe('With valid data', () => {
        beforeEach(() => {
          createQueryBuilderFriendship.mockResolvedValue(mockedFriendship);
        });
        it('should respond with 200 status', () => {
          return request(app.getHttpServer()).delete('1/remove').expect(200);
        });
      });
      describe('With invalid data', () => {
        beforeEach(() => {
          createQueryBuilderFriendship.mockResolvedValue(undefined);
        });
        it('should respond with error', () => {
          expect(
            request(app.getHttpServer()).delete('0/remove'),
          ).rejects.toThrow();
        });
      });
    });
  });
});
