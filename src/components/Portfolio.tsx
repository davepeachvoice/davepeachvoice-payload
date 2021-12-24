import { PortfolioItemInterface } from '@components/PortfolioItems/PortfolioItemInterface';
import React from 'react';
import PortfolioSection from '../components/pages/Portfolio/Section';
import { PortfolioCategory } from '../import-portfolio-data';

interface Props {
  setPlayingPortfolioItem: React.Dispatch<
    React.SetStateAction<PortfolioItemInterface>
  >;
  portfolioData: [string, Pick<PortfolioCategory, 'priority' | 'items'>][];
}

export default function Portfolio(props: Props) {
  return (
    <div>
      {props.portfolioData.map((portfolioCategory) => (
        <PortfolioSection
          key={portfolioCategory[0]}
          name={portfolioCategory[0]}
          items={portfolioCategory[1].items}
          setPlayingPortfolioItem={props.setPlayingPortfolioItem}
        ></PortfolioSection>
      ))}
    </div>
  );
}
