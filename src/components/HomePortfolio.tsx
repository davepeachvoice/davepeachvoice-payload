import React, { useEffect, useState } from 'react';

import { PortfolioItemInterface } from './PortfolioItems/PortfolioItemInterface';
import { importPortfolioItems } from 'src/import-portfolio-data';
import PortfolioItems from '@components/PortfolioItems/PortfolioItems';

interface Props {
  setPlayingPortfolioItem: React.Dispatch<
    React.SetStateAction<PortfolioItemInterface>
  >;
}

export default function HomePortfolio(props: Props) {
  const [portfolioItems, setPortfolioItems] = useState<
    PortfolioItemInterface[]
  >([]);

  useEffect(() => {
    async function setInitialProps() {
      const portfolioItemsMarkdownData = await importPortfolioItems();

      console.log('got portfolio items');
      console.log(portfolioItemsMarkdownData);

      const portfolioItems = portfolioItemsMarkdownData.map(
        (portfolioItemMarkdownData) => portfolioItemMarkdownData.attributes
      );

      setPortfolioItems(portfolioItems);
    }

    setInitialProps();
  }, []);

  return (
    <div>
      <PortfolioItems
        items={portfolioItems}
        setPlayingPortfolioItem={props.setPlayingPortfolioItem}
      ></PortfolioItems>
    </div>
  );
}
