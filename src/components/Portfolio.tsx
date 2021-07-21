import React from 'react';

import PortfolioItems from './PortfolioItems/PortfolioItems';
import { PortfolioItemInterface } from './PortfolioItems/PortfolioItemInterface';

export default function Portfolio() {
  const items = [buildPortfolioItem(1), buildPortfolioItem(2)];
  items.push(buildPortfolioItem(3));
  return <PortfolioItems items={items}></PortfolioItems>;
}

function buildPortfolioItem(index) {
  const mediaType: PortfolioItemInterface['mediaType'] =
    index % 2 == 0 ? 'video' : 'audio';
  return {
    title: `hi there ${index}`,
    mediaType: mediaType,
    mediaSource: '',
    thumbnailSource: '/dave-peach-web-netlify-cms/march_madness.png',
  } as PortfolioItemInterface;
}
