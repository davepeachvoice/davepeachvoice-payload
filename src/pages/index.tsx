import HomeExperience from '@components/HomeExperience';
import HomeHero from '@components/HomeHero';
import HomePortfolio from '@components/HomePortfolio';
import Layout from '@components/Layout';
import VideoModal from '@components/Media/VideoModal';
import HomeAudio from '@components/pages/Home/HomeAudio/HomeAudio';
import { PortfolioItemInterface } from '@components/PortfolioItems/PortfolioItemInterface';
import type { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { importPortfolioItems } from 'src/import-portfolio-data';
import { buildBlurDataUrl } from '../common/cloudinary-build-blur-data-url';
const AudioWaveform = dynamic(() => import('@components/Media/AudioWaveform'), {
  ssr: false,
});

export default function Index(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [playingPortfolioItem, setPlayingPortfolioItem] =
    useState<PortfolioItemInterface>(null);

  const [mediaElement, setMediaElement] = useState<HTMLAudioElement>(null);
  const [mediaElementUnlocked, setMediaElementUnlocked] = useState(false);

  function handleTouchStart() {
    if (mediaElementUnlocked) {
      console.debug('mediaElement already unlocked');
      return;
    }

    const localMediaElement = document.createElement('audio');

    console.debug('calling play');
    localMediaElement.play();

    console.debug('calling pause');
    localMediaElement.pause();

    console.debug('setting current time');
    localMediaElement.currentTime = 0;

    console.debug('setting media element');

    setMediaElement(localMediaElement);
    setMediaElementUnlocked(true);
  }

  // useEffect(() => {
  //   const mediaElementToUnlock = document.createElement('audio');
  //   // mediaElementToUnlock.play();

  //   setMediaElement(mediaElementToUnlock);

  //   document.body.addEventListener(
  //     'touchstart',
  //     function () {
  //       if (!mediaElement || mediaElementUnlocked) {
  //         console.debug('mediaElement not found or already unlocked');
  //         return;
  //       }

  //       mediaElement.play();
  //       mediaElement.pause();
  //       mediaElement.currentTime = 0;

  //       setMediaElementUnlocked(true);
  //     },
  //     false
  //   );
  //   // we really only want this to run once
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    console.debug('got new playing portfolio item');
    console.debug(playingPortfolioItem);
  }, [playingPortfolioItem]);

  return (
    <div
      onTouchStart={handleTouchStart}
      onClickCapture={handleTouchStart}
      onClick={handleTouchStart}
    >
      <Layout title=''>
        <HomeHero imageBlurDataUrl={props.heroImageBlurDataUrl}></HomeHero>
        <HomeAudio></HomeAudio>
        <HomeExperience></HomeExperience>
        <HomePortfolio
          setPlayingPortfolioItem={setPlayingPortfolioItem}
          portfolioItems={props.portfolioItems}
        ></HomePortfolio>
        <AudioWaveform
          portfolioItem={playingPortfolioItem}
          mediaElement={mediaElement}
        ></AudioWaveform>
        <VideoModal
          portfolioItem={playingPortfolioItem}
          setPortfolioItem={setPlayingPortfolioItem}
        ></VideoModal>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const portfolioItemsMarkdownData = await importPortfolioItems();

  const portfolioItems = portfolioItemsMarkdownData.map(
    (portfolioItemMarkdownData) => portfolioItemMarkdownData.attributes
  );

  return {
    props: {
      portfolioItems,
      heroImageBlurDataUrl: buildBlurDataUrl(
        '/dave-peach-web-netlify-cms/march_madness.png'
      ),
    },
  };
}
