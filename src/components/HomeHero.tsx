import { Box } from 'grommet';
import Image from 'next/image';
import * as React from 'react';

interface Props {
  imageBlurDataUrl: string;
}

export default function HomeHero(props: Props) {
  return (
    <Box>
      <div
        style={{
          height: '50vh',
          position: 'relative',
        }}
      >
        <Image
          className='next-image'
          layout='fill'
          objectFit='contain'
          src='/dave-peach-web-netlify-cms/march_madness'
          objectPosition='center top'
          alt='Dave Peach announcing at March Madness in 2021'
          placeholder='blur'
          blurDataURL={props.imageBlurDataUrl}
        />
      </div>
    </Box>
  );
}
