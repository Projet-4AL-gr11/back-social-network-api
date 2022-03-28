import { Media } from '../domain/entities/media.entity';
import { GetPictureTemporaryLinkQuery } from '../cqrs/query/get-picture-temporary-link.query';

describe('MediaQuery', () => {
  const mockMedia = new Media();
  mockMedia.id = '1';

  describe('GetPictureTemporaryLinkQuery', () => {
    it('should create a GetPictureTemporaryLinkQuery instance', () => {
      const query = new GetPictureTemporaryLinkQuery(mockMedia);
      expect(query.picture).toBe(mockMedia);
      expect(query instanceof GetPictureTemporaryLinkQuery).toBe(true);
    });
  });
});
