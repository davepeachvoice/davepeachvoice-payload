import { react as HomeContent } from '@content/home.md';
import { Box } from 'grommet';
import React from 'react';

const HomeExperience = () => {
  return (
    <Box align='center'>
      <Box height='small' width='large' justify='center'>
        <HomeContent></HomeContent>
      </Box>
    </Box>
  );
};

export default HomeExperience;
