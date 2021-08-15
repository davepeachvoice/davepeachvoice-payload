import React from 'react';
import { Box } from 'grommet';
import { react as HomeContent } from '@content/home.md';

const HomeHero = () => {
  return (
    <Box height='500px'>
      <HomeContent></HomeContent>
    </Box>
  );
};

export default HomeHero;
