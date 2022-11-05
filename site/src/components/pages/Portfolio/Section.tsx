'use client';

import React from 'react';
import { PortfolioItemInterface } from '../../PortfolioItems/PortfolioItemInterface';
import PortfolioItems from '../../PortfolioItems/PortfolioItems';

interface Props {
  name: string;
  items: PortfolioItemInterface[];
  setPlayingPortfolioItem: React.Dispatch<
    React.SetStateAction<PortfolioItemInterface>
  >;
}

export default function Section(props: Props) {
  return (
    <div id={props.name} className='px-4' key={props.name}>
      <div className='flex-row justify-between align-center mh-2'>
        <a href={`#${props.name}`} color='white'>
          <div className='text-lg'>{props.name}</div>
        </a>
      </div>
      <PortfolioItems
        items={props.items}
        setPlayingPortfolioItem={props.setPlayingPortfolioItem}
      ></PortfolioItems>
    </div>
  );
}
