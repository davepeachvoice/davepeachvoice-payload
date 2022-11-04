import CloudinaryImage from './cloudinary-image';

export default function HomeHero() {
  const imageId = '/dave-peach-web-netlify-cms/march_madness';
  // const blurDataUrl = buildBlurDataUrl(imageId);
  return (
    <div>
      <div className='relative h-[50vh]'>
        <CloudinaryImage
          className='object-contain'
          fill
          src={imageId}
          alt='Dave Peach announcing at March Madness in 2021'
          // placeholder='blur'
          // blurDataURL={blurDataUrl}
        />
      </div>
    </div>
  );
}
