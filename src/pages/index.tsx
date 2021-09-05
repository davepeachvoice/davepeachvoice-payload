import React, { useState, useEffect } from 'react';
import Layout from '@components/Layout';
import HomeAudio from '@components/pages/Home/HomeAudio/HomeAudio';
import HomeHero from '@components/HomeHero';
import VideoModal from '@components/Media/VideoModal';
import { PortfolioItemInterface } from '@components/PortfolioItems/PortfolioItemInterface';
import HomeExperience from '@components/HomeExperience';
import HomePortfolio from '@components/HomePortfolio';
import dynamic from 'next/dynamic';
const AudioWaveform = dynamic(() => import('@components/Media/AudioWaveform'), {
  ssr: false,
});

const Index = () => {
  const [
    playingPortfolioItem,
    setPlayingPortfolioItem,
  ] = useState<PortfolioItemInterface>(null);

  useEffect(() => {
    console.log('got new playing portfolio item');
    console.log(playingPortfolioItem);
  }, [playingPortfolioItem]);

  return (
    <Layout>
      <HomeHero></HomeHero>
      <HomeAudio></HomeAudio>
      <HomeExperience></HomeExperience>
      <HomePortfolio
        setPlayingPortfolioItem={setPlayingPortfolioItem}
      ></HomePortfolio>
      <AudioWaveform portfolioItem={playingPortfolioItem}></AudioWaveform>
      <VideoModal portfolioItem={playingPortfolioItem}></VideoModal>
    </Layout>
  );
};

export default Index;
