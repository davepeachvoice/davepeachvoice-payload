import React, { useState } from 'react';
import Layout from '../components/Layout';
import Portfolio from '@components/Portfolio';
import { PortfolioItemInterface } from '@components/PortfolioItems/PortfolioItemInterface';

export default function PortfolioPage() {
  const [
    playingPortfolioItem,
    setPlayingPortfolioItem,
  ] = useState<PortfolioItemInterface>(null);

  return (
    <Layout>
      <Portfolio setPlayingPortfolioItem={setPlayingPortfolioItem}></Portfolio>
    </Layout>
  );
}
