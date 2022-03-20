import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mockedConfigService } from '../../../util/mocks/config.service.mock';
import { JwtService } from '@nestjs/jwt';
import { mockedJwtService } from '../../../util/mocks/jwt.service.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AuthService } from '../auth.service';
import { User } from '../../user/domain/entities/user.entity';
import { UserDto } from '../../user/domain/dto/user.dto';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from '../auth.controller';
import { RegisterHandler } from '../cqrs/handler/register.handler';
import { UserService } from '../../user/user.service';
import { UserType } from '../../user/domain/enum/user-type.enum';
import JwtAuthenticationGuard from '../guards/jwt-auth.guard';

describe('AuthControllerIntegration', () => {
  let app: INestApplication;
  let userData: UserDto;
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
    userData = {
      ...mockUserDto,
    };
    const userRepository = {
      create: jest.fn().mockResolvedValue(userData),
      save: jest.fn().mockReturnValue(Promise.resolve()),
    };

    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [AuthController],
      providers: [
        UserService,
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
          useValue: userRepository,
        },
      ],
    })
      .overrideGuard(JwtAuthenticationGuard)
      .useValue({ request: { user: userData } })
      .compile();
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
            email: mockUserDto.email,
            username: mockUserDto.username,
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
            username: mockUserDto.username,
          })
          .expect(400);
      });
      it('should throw an error Username less than 5 carac', () => {
        expect(
          request(app.getHttpServer()).post('/auth/signup').send({
            email: mockUserDto.email,
            username: 'test',
            password: 'strongPassword',
          }),
        ).rejects.toThrow();
      });
      it('should throw an error Username more than 20 carac', () => {
        expect(
          request(app.getHttpServer()).post('/auth/signup').send({
            email: mockUserDto.email,
            username: 'billybillybillybillyT',
            password: 'strongPassword',
          }),
        ).rejects.toThrow();
      });
      it('should throw an error invalid email', () => {
        expect(
          request(app.getHttpServer())
            .post('/auth/signup')
            .send({
              email: 'aquequoi@az',
              username: mockUserDto.username,
              password: 'strongPassword',
            })
            .expect(400),
        ).rejects.toThrow();
      });
    });
  });


});
