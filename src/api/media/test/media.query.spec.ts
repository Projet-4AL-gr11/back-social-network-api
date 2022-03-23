import { Media } from '../domain/entities/media.entity';
import { GetBannerPictureQuery } from '../cqrs/query/get-banner-picture.query';
import { GetProfilePictureQuery } from "../cqrs/query/get-profile-picture.query";

describe('MediaQuery', () => {
  const mockMedia = new Media();
  mockMedia.id = '1';

  describe('GetBannerPictureQuery', () => {
    it('should create a GetBannerPictureQuery instance', () => {
      const query = new GetBannerPictureQuery(mockMedia);
      expect(query.bannerPicture).toBe(mockMedia);
      expect(query instanceof GetBannerPictureQuery).toBe(true);
    });
  });

  describe('GetProfilePictureQuery', () => {
    it('should create a GetProfilePictureQuery instance', () => {
      const query = new GetProfilePictureQuery(mockMedia);
      expect(query.profilePicture).toBe(mockMedia);
      expect(query instanceof GetProfilePictureQuery).toBe(true);
    });
  });
});
