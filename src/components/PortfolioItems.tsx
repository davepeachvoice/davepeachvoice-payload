import React from 'react';
import * as Grommet from 'grommet';
import PortfolioItemInterface from './PortfolioItemInterface';
import RecordButton from '../components/RecordButton';

interface PortfolioItemsProps {
  items: PortfolioItemInterface[];
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
