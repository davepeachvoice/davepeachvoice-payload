import React from 'react';
import { Grid, Box } from 'grommet';
import { PortfolioItemDataInterface } from './PortfolioItemInterface';
import RecordButton from './RecordButton';

export interface PortfolioItemsProps {
  items: PortfolioItemDataInterface[];
}

/**
 * Credit: https://github.com/grommet/grommet-site/blob/master/src/screens/Components/Section.js (modified)
 */
export default function PortfolioItems(props: PortfolioItemsProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Grid.available exists, but not on the TypeScript type https://github.com/grommet/grommet/issues/5496
  if (typeof window === 'undefined' || Grid.available) {
    return (
      <Grid
        columns={{ count: 'fill', size: ['small', 'medium'] }}
        rows='small'
        gap={{ row: 'medium' }}
        justifyContent='center'
      >
        {props.items.map((item) => (
          <RecordButton key={item.title} item={item}></RecordButton>
        ))}
      </Grid>
    );
  } else {
    return (
      <Box direction='row' wrap>
        {React.Children.map(props.items, (item) => (
          <Box basis='medium' pad='small'>
            <Box basis='small'>
              {<RecordButton key={item.title} item={item}></RecordButton>}
            </Box>
          </Box>
        ))}
      </Box>
    );
  }
}
