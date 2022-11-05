'use client';

// import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { PortfolioCategory } from '../../../import-portfolio-data';
import * as UnlockMediaElement from '../../../lib/unlock-media-element';
import VideoModal from '../../Media/VideoModal';
import Portfolio from '../../Portfolio';
import { PortfolioItemInterface } from '../../PortfolioItems/PortfolioItemInterface';

// const AudioWaveform = dynamic(() => import('../../Media/AudioWaveform'), {
//   suspense: true,
//   ssr: false,
// });

export interface Props {
  portfolioData: [string, Pick<PortfolioCategory, 'priority' | 'items'>][];
}

const PortfolioPage: FC<Props> = (props) => {
  const [playingPortfolioItem, setPlayingPortfolioItem] =
    React.useState<PortfolioItemInterface>(null);
  const [mediaElement, setMediaElement] =
    React.useState<HTMLAudioElement>(null);

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
      <Portfolio
        portfolioData={props.portfolioData}
        setPlayingPortfolioItem={setPlayingPortfolioItem}
      ></Portfolio>
      {/* <Suspense>
        <AudioWaveform
          portfolioItem={playingPortfolioItem}
          mediaElement={mediaElement}
        ></AudioWaveform>
      </Suspense> */}
      <VideoModal
        portfolioItem={playingPortfolioItem}
        setPortfolioItem={setPlayingPortfolioItem}
      ></VideoModal>
    </div>
  );
};

export default PortfolioPage;
