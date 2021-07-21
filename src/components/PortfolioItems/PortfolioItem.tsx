import React from 'react';

import NikeCard from '../nikeCard/index';
import { PortfolioItemInterface } from './PortfolioItemInterface';

interface PortfolioItemProps {
  portfolioItem: PortfolioItemInterface;
}

export default function PortfolioItem(props: PortfolioItemProps) {
  return <NikeCard portfolioItem={props.portfolioItem}></NikeCard>;
}
