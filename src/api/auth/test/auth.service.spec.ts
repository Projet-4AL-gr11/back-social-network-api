import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { UserRepository } from '../../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockedJwtService } from '../../../util/mocks/jwt.service';
import { ConfigService } from '@nestjs/config';
import { mockedConfigService } from '../../../util/mocks/config.service';

describe('AuthService', () => {
  let app: TestingModule;
  let service: AuthService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [],
      providers: [
        AuthService,
        UserService,
        UserRepository,
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
          useValue: {},
        },
      ],
    }).compile();

    service = await app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
