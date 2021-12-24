import { buildUrl } from 'cloudinary-build-url';
import { Box } from 'grommet';
import Image from 'next/image';
import * as React from 'react';

const HomeHero = () => {
  const cloudinaryId = '/dave-peach-web-netlify-cms/march_madness.png';

  const url = buildUrl(cloudinaryId, {
    cloud: { cloudName: 'prestocloud' },
    transformations: {
      effect: 'blur:1000',
      quality: 1,
    },
  });

  console.log(url);

  return (
    <Box height='500px'>
      <Image
        height='500px'
        width='400px'
        layout='responsive'
        objectFit='contain'
        src={cloudinaryId}
        objectPosition='center top'
        alt='Dave Peach announcing at March Madness in 2021'
        placeholder='blur'
        blurDataURL='https://res.cloudinary.com/prestocloud/image/upload/w_10,q_auto,f_auto/dave-peach-web-netlify-cms/march_madness.png'
      />
    </Box>
  );
};

export default HomeHero;
