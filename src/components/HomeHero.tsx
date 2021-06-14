import React from "react";
import Image from "next/image";
import { Box } from "grommet";

const HomeHero = () => {
  return (
    <Box height="500px">
      <Image
        height="500px"
        width="400px"
        layout="responsive"
        objectFit="contain"
        src="/images/march_madness.png"
        objectPosition="center top"
      />
    </Box>
  );
};

export default HomeHero;
