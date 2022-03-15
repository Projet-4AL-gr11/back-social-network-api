import { AuthController } from '../auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../user/user.controller';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { UserRepository } from '../../user/user.repository';

describe('AuthController', () => {
  let authController: AuthController;
  let module: TestingModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService, UserRepository],
    }).compile();
    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
});
