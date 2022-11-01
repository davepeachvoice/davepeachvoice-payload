import Image from 'next/image';

interface Props {
  imageBlurDataUrl: string;
}

export default function HomeHero(props: Props) {
  return (
    <div>
      <div
        style={{
          height: '50vh',
          position: 'relative',
        }}
      >
        <Image
          className='next-image'
          fill
          style={{ objectFit: 'contain', objectPosition: 'center top' }}
          src='/dave-peach-web-netlify-cms/march_madness'
          alt='Dave Peach announcing at March Madness in 2021'
          placeholder='blur'
          blurDataURL={props.imageBlurDataUrl}
        />
      </div>
    </div>
  );
}
