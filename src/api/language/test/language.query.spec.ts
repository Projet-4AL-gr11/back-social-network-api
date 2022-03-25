import { GetLanguageQuery } from '../cqrs/query/get-language.query';

describe('LanguageQuery', () => {
  describe('GetLanguage', () => {
    it('should create a GetLanguage instance', () => {
      const query = new GetLanguageQuery();
      expect(query instanceof GetLanguageQuery).toBe(true);
    });
    it('should create a GetLanguage instance', () => {
      const query = new GetLanguageQuery('1');
      expect(query.id).toBe('1');
      expect(query instanceof GetLanguageQuery).toBe(true);
    });
  });
});
