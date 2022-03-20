import { Test } from '@nestjs/testing';
import { logger } from '../../config/winston-logger.config';
import { ErrorEventHandler } from '../error.event-handler';

describe('ErrorEventHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('ErrorEventHandler', () => {
    let handler: ErrorEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [ErrorEventHandler],
      }).compile();
      handler = mod.get(ErrorEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'error').mockImplementation();
        handler.handle({ localisation: '1', error: '2' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });
});
