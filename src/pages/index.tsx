import HomeExperience from '@components/HomeExperience';
import HomeHero from '@components/HomeHero';
import HomePortfolio from '@components/HomePortfolio';
import Layout from '@components/Layout';
import VideoModal from '@components/Media/VideoModal';
import HomeAudio from '@components/pages/Home/HomeAudio/HomeAudio';
import { PortfolioItemInterface } from '@components/PortfolioItems/PortfolioItemInterface';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
const AudioWaveform = dynamic(() => import('@components/Media/AudioWaveform'), {
  ssr: false,
});

const Index = () => {
  const [playingPortfolioItem, setPlayingPortfolioItem] =
    useState<PortfolioItemInterface>(null);

  useEffect(() => {
    console.log('got new playing portfolio item');
    console.log(playingPortfolioItem);
  }, [playingPortfolioItem]);

  return (
    <Layout title=''>
      <HomeHero></HomeHero>
      <HomeAudio></HomeAudio>
      <HomeExperience></HomeExperience>
      <HomePortfolio
        setPlayingPortfolioItem={setPlayingPortfolioItem}
      ></HomePortfolio>
      <AudioWaveform portfolioItem={playingPortfolioItem}></AudioWaveform>
      <VideoModal
        portfolioItem={playingPortfolioItem}
        setPortfolioItem={setPlayingPortfolioItem}
      ></VideoModal>
    </Layout>
  );
};

export default Index;
