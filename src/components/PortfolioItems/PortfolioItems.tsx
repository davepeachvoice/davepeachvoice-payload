import React from 'react';
import { Grid } from 'grommet';
import { PortfolioItemDataInterface } from './PortfolioItemInterface';
import RecordButton from './RecordButton';

export interface PortfolioItemsProps {
  items: PortfolioItemDataInterface[];
}

export default function PortfolioItems(props: PortfolioItemsProps) {
  return (
    <Grid
      gap='medium'
      columns={{ count: 3, size: 'auto' }}
      rows={['small', 'small']}
    >
      {props.items.map((item) => (
        <RecordButton key={item.title} item={item}></RecordButton>
      ))}
    </Grid>
  );
}
