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
          width: '500px',
          position: 'relative',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Image
          height='100%'
          width='100%'
          layout='responsive'
          objectFit='contain'
          src='/dave-peach-web-netlify-cms/march_madness.png'
          objectPosition='center top'
          alt='Dave Peach announcing at March Madness in 2021'
          placeholder='blur'
          blurDataURL={props.imageBlurDataUrl}
        />
      </div>
    </Box>
  );
}
