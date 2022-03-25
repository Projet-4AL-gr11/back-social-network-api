import { LanguageService } from '../language.service';
import { LanguageDto } from '../domain/dto/language.dto';
import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Language } from '../domain/entities/language.entity';

describe('LanguageService', () => {
  let service: LanguageService;
  let commandBus: jest.Mock;
  let queryBus: jest.Mock;
  let mockLanguageDto = new LanguageDto('test');
  const mockLanguage = new Language();
  mockLanguage.id = '1';
  mockLanguage.name = 'test';

  beforeEach(async () => {
    commandBus = jest.fn().mockResolvedValue('');
    queryBus = jest.fn().mockResolvedValue('');
    const modRef = await Test.createTestingModule({
      providers: [
        LanguageService,
        {
          provide: CommandBus,
          useValue: {
            execute: commandBus,
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: queryBus,
          },
        },
      ],
    }).compile();
    service = modRef.get(LanguageService);
  });

  describe('CreateLanguage', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(mockLanguage);
    });
    it('should return a language', async function () {
      expect(await service.create(mockLanguageDto)).toEqual(mockLanguage);
    });
  });

  describe('DeleteLanguage', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(undefined);
    });
    it('should return nothing', async function () {
      expect(await service.delete('1')).toEqual(undefined);
    });
  });

  describe('UpdateLanguage', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(mockLanguage);
    });
    it('should return nothing', async function () {
      expect(await service.update('1', mockLanguageDto)).toEqual(mockLanguage);
    });
  });

  describe('get All', () => {
    beforeEach(async () => {
      queryBus.mockResolvedValue([mockLanguage, mockLanguage]);
    });
    it('should return a list of language', async function () {
      expect(await service.getAll()).toEqual([mockLanguage, mockLanguage]);
    });
  });

  describe('get one', () => {
    beforeEach(async () => {
      queryBus.mockResolvedValue(mockLanguage);
    });
    it('should return a language', async function () {
      expect(await service.getOne('1')).toEqual(mockLanguage);
    });
  });
});
