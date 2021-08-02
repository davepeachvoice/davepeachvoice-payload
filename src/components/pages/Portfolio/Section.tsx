import React from 'react';
import { Anchor, Box, Grid, Heading } from 'grommet';

interface Props {
  name: string;
  children: React.ReactNode;
}

/**
 * Credit: https://github.com/grommet/grommet-site/blob/master/src/screens/Components/Section.js (modified)
 */
export default function Section(props: Props) {
  return (
    <Box id={props.name} pad={{ vertical: 'medium' }}>
      <Box
        direction='row'
        justify='between'
        align='center'
        margin={{ top: 'none', horizontal: 'small' }}
      >
        <Anchor href={`#${props.name}`} color='white'>
          <Heading level={2}>{props.name}</Heading>
        </Anchor>
      </Box>
      {typeof window === 'undefined' || Grid.available ? (
        // Defaults to grid available during server/static renders as this
        // option represents the majority of browsers.
        <Grid
          columns={{ count: 'fill', size: ['small', 'medium'] }}
          rows='small'
          gap={{ row: 'medium' }}
          justifyContent='center'
        >
          {props.children}
        </Grid>
      ) : (
        <Box direction='row' wrap>
          {React.Children.map(props.children, (child) => (
            <Box basis='medium' pad='small'>
              <Box basis='small'>{child}</Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
