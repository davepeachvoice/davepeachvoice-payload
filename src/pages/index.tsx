import HomeExperience from '@components/HomeExperience';
import HomeHero from '@components/HomeHero';
import HomePortfolio from '@components/HomePortfolio';
import Layout from '@components/Layout';
import VideoModal from '@components/Media/VideoModal';
import HomeAudio from '@components/pages/Home/HomeAudio/HomeAudio';
import { PortfolioItemInterface } from '@components/PortfolioItems/PortfolioItemInterface';
import type { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
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

  // Deal with Safari auto-play blocking. On the first user interaction, call play() on the
  // MediaElement that AudioWaveform will use. This will "unlock" the MediaElement such that
  //subsequent .play() calls performed by Waveform.js will succeed.
  // https://stackoverflow.com/questions/31776548/why-cant-javascript-play-audio-files-on-iphone-safari
  function constructUnlockedMediaElement() {
    // did we already handle the first touchStart
    if (mediaElement) {
      return;
    }

    const localMediaElement = document.createElement('audio');

    // this will fail, so we catch it so that the user doesn't see it in the browser logs
    localMediaElement.play().catch(() => {});
    localMediaElement.pause();
    localMediaElement.currentTime = 0;

    setMediaElement(localMediaElement);
  }

  return (
    <div
      onTouchStart={constructUnlockedMediaElement}
      onClick={constructUnlockedMediaElement}
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
