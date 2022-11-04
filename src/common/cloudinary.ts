import { buildImageUrl } from 'cloudinary-build-url';
import { ImageLoader } from 'next/image';

const CLOUD_NAME = 'prestocloud';

export function buildBlurDataUrl(src: string) {
  return buildImageUrl(src, {
    cloud: { cloudName: CLOUD_NAME },
    transformations: {
      quality: 1,
      resize: {
        width: 10,
        type: 'scale',
        aspectRatio: '1',
      },
      format: 'auto',
    },
  });
}

export const imageLoader: ImageLoader = ({ src, width, quality }) => {
  return buildImageUrl(src, {
    cloud: { cloudName: CLOUD_NAME },
    transformations: {
      quality,
      resize: {
        width,
        type: 'limit',
        aspectRatio: '1',
      },
      format: 'auto',
    },
  });
};
