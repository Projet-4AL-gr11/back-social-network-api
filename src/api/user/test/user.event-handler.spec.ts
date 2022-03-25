import { DeleteUserEventHandler } from '../cqrs/event-bus/delete-user.event-handler';
import { Test } from '@nestjs/testing';
import { logger } from '../../../util/config/winston-logger.config';
import { RemoveRefreshTokenEventHandler } from '../cqrs/event-bus/remove-refresh-token.event-handler';
import { UpdateUserEventHandler } from '../cqrs/event-bus/update-user.event-handler';
import { SetCurrentRefreshTokenEventHandler } from '../cqrs/event-bus/set-current-refresh-token.event-handler';

describe('UserEventHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('DeleteUserEventHandler', () => {
    let handler: DeleteUserEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [DeleteUserEventHandler],
      }).compile();
      handler = mod.get(DeleteUserEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ userId: 'test' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('RemoveRefreshTokenEventHandler', () => {
    let handler: RemoveRefreshTokenEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [RemoveRefreshTokenEventHandler],
      }).compile();
      handler = mod.get(RemoveRefreshTokenEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ userId: 'test' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('UpdateUserEventHandler', () => {
    let handler: UpdateUserEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [UpdateUserEventHandler],
      }).compile();
      handler = mod.get(UpdateUserEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ userId: 'test' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('SetCurrentRefreshTokenEventHandler', () => {
    let handler: SetCurrentRefreshTokenEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [SetCurrentRefreshTokenEventHandler],
      }).compile();
      handler = mod.get(SetCurrentRefreshTokenEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ userId: 'test', refreshToken: 'test2' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });
});
