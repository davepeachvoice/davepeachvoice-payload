import React from 'react';
import * as Grommet from 'grommet';
import { PortfolioItemDataInterface } from './PortfolioItemInterface';
import RecordButton from './RecordButton';

export interface PortfolioItemsProps {
  items: PortfolioItemDataInterface[];
}

export default function PortfolioItems(props: PortfolioItemsProps) {
  return (
    <Grommet.Box pad='large' background='dark-1' height='100%'>
      <Grommet.Grid gap='medium' columns={{ count: 'fit', size: 'small' }}>
        {props.items.map((item) => (
          <RecordButton
            key={item.title}
            item={item}
            onClick={() => {
              alert('Card was Clicked!');
            }}
          ></RecordButton>
        ))}
      </Grommet.Grid>
    </Grommet.Box>
  );
}
