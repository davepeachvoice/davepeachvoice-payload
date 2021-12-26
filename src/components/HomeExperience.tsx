import { react as HomeContent } from '@content/home.md';
import { Box } from 'grommet';
import React from 'react';
import styled from 'styled-components';

const SmallableSpanMedium = styled.span`
  @media screen and (max-width: 400px) {
    font-size: 5vw;
    line-height: 5vw;
  }
`;

export default function HomeExperience() {
  return (
    <Box align='center'>
      <Box height='small' width='large' pad='large'>
        <SmallableSpanMedium>
          <HomeContent></HomeContent>
        </SmallableSpanMedium>
      </Box>
    </Box>
  );
}
