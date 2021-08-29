import React from 'react';
import { Box } from 'grommet';
import { react as HomeContent } from '@content/home.md';

const HomeHero = () => {
  return (
    <Box align='center'>
      <Box height='small' width='large' justify='center'>
        <HomeContent></HomeContent>
      </Box>
    </Box>
  );
};

export default HomeHero;
