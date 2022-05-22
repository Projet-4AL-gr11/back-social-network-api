import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mockedConfigService } from '../../../util/mocks/config.service.mock';
import { JwtService } from '@nestjs/jwt';
import { mockedJwtService } from '../../../util/mocks/jwt.service.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from '../domain/entities/user.entity';
import { UserDto } from '../domain/dto/user.dto';
import {
  mockedUserList,
  mockedUserListResponse,
} from '../../../util/mocks/dto/user.dto.mock';
import { UserController } from '../user.controller';
import { DeleteUserHandler } from '../cqrs/handler/command/delete-user.handler';
import { UpdateUserHandler } from '../cqrs/handler/command/update-user.handler';
import { GetUserHandler } from '../cqrs/handler/query/get-user.handler';
import { UserResponse } from '../domain/response/user.response';
import { UserType } from '../domain/enum/user-type.enum';
import { JwtStrategy } from '../../auth/strategy/jwt.strategy';
import { UserService } from '../user.service';
import JwtRefreshGuard from '../../auth/guards/jwt-refresh-token.guard';

describe('UserControllerIntegration', () => {
  let app: INestApplication;
  let userData: UserDto[];
  let find: jest.Mock;
  let findOneOrFail: jest.Mock;
  let update: jest.Mock;

  beforeEach(async () => {
    userData = mockedUserList;
    find = jest.fn().mockResolvedValue(userData);
    findOneOrFail = jest.fn().mockResolvedValue(userData);
    update = jest.fn().mockResolvedValue(userData[0]);
    const userRepository = {
      create: jest.fn().mockResolvedValue(userData),
      save: jest.fn().mockReturnValue(Promise.resolve()),
      delete: jest.fn().mockResolvedValue(undefined),
      findOneOrFail: findOneOrFail,
      find: find,
      update: update,
    };

    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [UserController],
      providers: [
        UserService,
        DeleteUserHandler,
        UpdateUserHandler,
        GetUserHandler,
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
      ],
    })
      .overrideGuard(JwtRefreshGuard)
      .useValue({})
      .compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('when get user', () => {
    describe('with valid parameter', () => {
      describe(' wih userId', () => {
        beforeEach(() => {
          findOneOrFail.mockResolvedValue(mockedUserListResponse[0]);
          find.mockResolvedValue(mockedUserList);
        });
        it('should respond with user', () => {
          const expectedData = {
            ...mockedUserListResponse[0],
          };
          return request(app.getHttpServer())
            .get('/user/1')
            .expect(200)
            .expect(expectedData);
        });
        describe('all', () => {
          it('should respond with user', () => {
            const expectedData = [
              {
                id: mockedUserListResponse.userList[0].id,
                username: mockedUserListResponse.userList[0].username,
                email: mockedUserListResponse.userList[0].email,
                userType: mockedUserListResponse.userList[0].userType,
              },
              {
                id: mockedUserListResponse.userList[1].id,
                username: mockedUserListResponse.userList[1].username,
                email: mockedUserListResponse.userList[1].email,
                userType: mockedUserListResponse.userList[1].userType,
              },
            ];
            return request(app.getHttpServer())
              .get('/user/')
              .expect(200)
              .expect(expectedData);
          });
        });
      });
    });
    describe('with invalid parameter', () => {
      describe(' wih userId', () => {
        beforeEach(() => {
          findOneOrFail.mockResolvedValue(undefined);
        });
        it('should respond with 400', async () => {
          await expect(
            request(app.getHttpServer()).get('/user/0').expect(400),
          ).rejects.toThrow();
        });
      });
    });
  });
  describe('when update user', () => {
    describe('with valid data', () => {
      beforeEach(() => {
        const expectedValue = new UserResponse(
          '1',
          'hohoho',
          'hohoho@gmail.com',
          UserType.USER,
        );
        findOneOrFail.mockResolvedValue(expectedValue);
      });
      it('should respond with updated user', () => {
        const expectedData = {
          id: '1',
          username: 'hohoho',
          email: 'hohoho@gmail.com',
          userType: UserType.USER,
        };
        return request(app.getHttpServer())
          .patch('/user/1')
          .send({
            email: 'hohoho@gmail.com',
            username: 'hohoho',
          })
          .expect(200)
          .expect(expectedData);
      });
    });
    describe('with invalid data', () => {
      beforeEach(() => {
        update.mockResolvedValue(undefined);
      });
      it('should respond with error (email)', () => {
        return request(app.getHttpServer())
          .patch('/user/1')
          .send({
            email: 'hohoho',
            username: 'hohoho',
          })
          .expect(400);
      });
      it('should respond with error (username too short)', () => {
        return request(app.getHttpServer())
          .patch('/user/1')
          .send({
            email: 'hohoho@gmail.com',
            username: 'test',
          })
          .expect(400);
      });
      it('should respond with error (username too long)', () => {
        return request(app.getHttpServer())
          .patch('/user/1')
          .send({
            email: 'hohoho@gmail.com',
            username: 'test_test_test_test_T',
          })
          .expect(400);
      });
    });
  });
  describe('when delete user', () => {
    describe('with valid userId', () => {
      it('should return 200', () => {
        return request(app.getHttpServer()).delete('/user/1').expect(200);
      });
    });
  });
});
