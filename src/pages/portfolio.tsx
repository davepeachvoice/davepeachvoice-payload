import VideoModal from '@components/Media/VideoModal';
import Portfolio from '@components/Portfolio';
import { PortfolioItemInterface } from '@components/PortfolioItems/PortfolioItemInterface';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import Layout from '../components/Layout';
const AudioWaveform = dynamic(() => import('@components/Media/AudioWaveform'), {
  ssr: false,
});

export default function PortfolioPage() {
  const [playingPortfolioItem, setPlayingPortfolioItem] =
    useState<PortfolioItemInterface>(null);

  return (
    <Layout title='Portfolio'>
      <Portfolio setPlayingPortfolioItem={setPlayingPortfolioItem}></Portfolio>
      <AudioWaveform portfolioItem={playingPortfolioItem}></AudioWaveform>
      <VideoModal
        portfolioItem={playingPortfolioItem}
        setPortfolioItem={setPlayingPortfolioItem}
      ></VideoModal>
    </Layout>
  );
}
