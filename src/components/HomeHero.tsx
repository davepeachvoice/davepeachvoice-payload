import { Box } from 'grommet';
import Image from 'next/image';
import React from 'react';

const HomeHero = () => {
  return (
    <Box height='500px'>
      <Image
        height='500px'
        width='400px'
        layout='responsive'
        objectFit='contain'
        src='/dave-peach-web-netlify-cms/march_madness.png'
        objectPosition='center top'
        alt='Dave Peach announcing at March Madness in 2021'
      />
    </Box>
  );
};

export default HomeHero;
