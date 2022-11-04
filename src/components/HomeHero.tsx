'use client';

import { buildImageUrl } from 'cloudinary-build-url';
import { ImageLoaderPropsWithConfig } from 'next/dist/shared/lib/image-config';
import Image from 'next/image';
import { CLOUD_NAME } from '../common/cloudinary-build-blur-data-url';

interface Props {
  imageBlurDataUrl: string;
}

function normalizeSrc(src: string): string {
  return src[0] === '/' ? src.slice(1) : src;
}

function cloudinaryLoader({
  config,
  src,
  width,
  quality,
}: ImageLoaderPropsWithConfig): string {
  // const path =
  //   config?.path ?? 'https://res.cloudinary.com/prestocloud/image/upload/';
  const imgUrl = buildImageUrl(src, {
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
  // const params = [
  //   'f_auto',
  //   'c_limit',
  //   'w_' + width,
  //   'q_' + (quality || 'auto'),
  // ];
  // const paramsString = params.join(',') + '/';
  return imgUrl;
}

export default function HomeHero(props: Props) {
  const imgUrl = buildImageUrl('dave-peach-web-netlify-cms/march_madness', {
    cloud: { cloudName: CLOUD_NAME },
    transformations: {
      quality: 1,
      resize: {
        width: 10,
        type: 'scale',
        aspectRatio: '1',
      },
    },
  });

  return (
    <div>
      <div className='relative h-[50vh]'>
        <Image
          fill
          className='object-contain next-image'
          src={'/dave-peach-web-netlify-cms/march_madness'}
          alt='Dave Peach announcing at March Madness in 2021'
          loader={cloudinaryLoader}
          // placeholder='blur'
          // blurDataURL={props.imageBlurDataUrl}
        />
      </div>
    </div>
  );
}
