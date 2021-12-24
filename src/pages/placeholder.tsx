import { Box } from 'grommet';
import type { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import * as React from 'react';

export const getStaticProps = async () => {
  const { base64, img } = await getPlaiceholder(
    '/dave-peach-web-netlify-cms/march_madness.png'
  );

  return {
    props: {
      imageProps: {
        ...img,
        blurDataURL: base64,
      },
    },
  };
};

const HomeHero: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  imageProps,
}) => {
  console.log(imageProps);

  return (
    <Box height='500px'>
      <Image
        layout='responsive'
        objectFit='contain'
        src='/dave-peach-web-netlify-cms/march_madness.png'
        objectPosition='center top'
        alt='Dave Peach announcing at March Madness in 2021'
        // image is visible above the fold
        priority
        {...imageProps}
        placeholder='blur'
      />
    </Box>
  );
};

export default HomeHero;
