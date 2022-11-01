import React from 'react';
import { PortfolioItemInterface } from './PortfolioItems/PortfolioItemInterface';
import PortfolioItems from './PortfolioItems/PortfolioItems';

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
