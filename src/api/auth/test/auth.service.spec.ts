import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/domain/entities/user.entity';
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
