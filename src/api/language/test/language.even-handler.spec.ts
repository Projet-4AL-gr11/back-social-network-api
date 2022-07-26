import { LanguageDto } from '../domain/dto/language.dto';
import { Test } from '@nestjs/testing';
import { logger } from '../../../util/config/winston-logger.config';
import { DeleteLanguageEventHandler } from '../cqrs/event-handler/delete-language.event-handler';
import { CreateLanguageEventHandler } from '../cqrs/event-handler/create-language.event-handler';
import { UpdateLanguageEventHandler } from '../cqrs/event-handler/update-language.event-handler';

describe('LanguageEventHandler', () => {
  const mockLanguageDto = new LanguageDto('test', 'test');
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('DeleteLanguageEventHandler', () => {
    let handler: DeleteLanguageEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [DeleteLanguageEventHandler],
      }).compile();
      handler = mod.get(DeleteLanguageEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ id: '1' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('CreateLanguageEventHandler', () => {
    let handler: CreateLanguageEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [CreateLanguageEventHandler],
      }).compile();
      handler = mod.get(CreateLanguageEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ name: '1' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('CreateLanguageEventHandler', () => {
    let handler: UpdateLanguageEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [UpdateLanguageEventHandler],
      }).compile();
      handler = mod.get(UpdateLanguageEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ id: '1' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });
});
