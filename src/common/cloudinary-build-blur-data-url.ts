import { buildImageUrl } from 'cloudinary-build-url';

export function buildBlurDataUrl(cloudinaryImageId: string) {
  return buildImageUrl(cloudinaryImageId, {
    cloud: { cloudName: 'prestocloud' },
    transformations: {
      quality: 1,
      resize: {
        width: 10,
        type: 'scale',
        aspectRatio: '1',
      },
    },
  });
}
