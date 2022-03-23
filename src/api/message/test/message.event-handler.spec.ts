import { SaveMessageHandler } from '../cqrs/handler/save-message.handler';
import { Test } from '@nestjs/testing';
import { logger } from '../../../util/config/winston-logger.config';
import { SaveMessageEventHandler } from '../cqrs/event-handler/save-message.event-handler';

describe('MessageEventHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('SaveMessageEventHandler', () => {
    let handler: SaveMessageEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [SaveMessageEventHandler],
      }).compile();
      handler = mod.get(SaveMessageEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ authorId: '1', content: 'test' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });
});
