import PortfolioItems from '@components/PortfolioItems/PortfolioItems';
import React from 'react';
import { PortfolioItemInterface } from './PortfolioItems/PortfolioItemInterface';

interface Props {
  setPlayingPortfolioItem: React.Dispatch<
    React.SetStateAction<PortfolioItemInterface>
  >;
  portfolioItems: PortfolioItemInterface[];
}

export default function HomePortfolio(props: Props) {
  return (
    <div>
      <PortfolioItems
        items={props.portfolioItems}
        setPlayingPortfolioItem={props.setPlayingPortfolioItem}
      ></PortfolioItems>
    </div>
  );
}
