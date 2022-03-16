import { AuthController } from '../auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { User } from '../../user/domain/entities/user.entity';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { UserDto } from '../../user/domain/dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { mockedConfigService } from '../../../util/mocks/config.service.mock';
import { JwtService } from '@nestjs/jwt';
import { mockedJwtService } from '../../../util/mocks/jwt.service.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import mockedUser from '../../../util/mocks/dto/user.dto.mock';
import * as request from 'supertest';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterHandler } from '../cqrs/handler/register.handler';

describe('AuthController', () => {
  let authController: AuthController;
  let module: TestingModule;
  let app: INestApplication;
  let userData: UserDto;

  beforeEach(async () => {
    userData = {
      ...mockedUser,
    };
    const usersRepository = {
      create: jest.fn().mockResolvedValue(userData),
      save: jest.fn().mockReturnValue(Promise.resolve()),
    };

    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [AuthController],
      providers: [
        AuthService,
        RegisterHandler,
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
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('when registering', () => {
    describe('and using valid data', () => {
      it('should respond with the data of the user without the password', () => {
        const expectedData = {
          username: userData.username,
          email: userData.email,
        };
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            email: mockedUser.email,
            username: mockedUser.username,
            password: 'strongPassword',
          })
          .expect(201)
          .expect(expectedData);
      });
    });
    describe('and using invalid data', () => {
      it('should throw an error', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            username: mockedUser.username,
          })
          .expect(400);
      });
    });
  });
});
