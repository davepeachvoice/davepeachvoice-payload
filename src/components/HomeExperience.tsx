import React from 'react';
import { Box } from 'grommet';
import { react as HomeContent } from '@content/home.md';
import { Parallax } from './Parallax/Parallax';

const HomeHero = () => {
  return (
    <Box height='500px'>
      <Parallax></Parallax>
      <HomeContent></HomeContent>
    </Box>
  );
};

export default HomeHero;
