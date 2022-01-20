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
import { comparePriorities } from '../lib/compare-priorities';
import * as UnlockMediaElement from '../lib/unlock-media-element';
const AudioWaveform = dynamic(() => import('@components/Media/AudioWaveform'), {
  ssr: false,
});

export default function Index(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [playingPortfolioItem, setPlayingPortfolioItem] =
    useState<PortfolioItemInterface>(null);
  const [mediaElement, setMediaElement] = useState<HTMLAudioElement>(null);

  function handleFirstUserInteraction() {
    // did we already handle the first user interaction?
    if (mediaElement) {
      return;
    }

    setMediaElement(UnlockMediaElement.constructUnlockedMediaElement());
  }

  return (
    <div
      onTouchStart={handleFirstUserInteraction}
      onClick={handleFirstUserInteraction}
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

  portfolioItems.sort(comparePriorities);

  return {
    props: {
      portfolioItems,
      heroImageBlurDataUrl: buildBlurDataUrl(
        '/dave-peach-web-netlify-cms/march_madness.png'
      ),
    },
  };
}
