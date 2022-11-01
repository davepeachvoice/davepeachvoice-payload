'use client';

import { FC, useState } from 'react';
import * as UnlockMediaElement from '../../lib/unlock-media-element';
import HomeExperience from '../HomeExperience';
import HomePortfolio from '../HomePortfolio';
import HomeAudio from '../pages/Home/HomeAudio/HomeAudio';
import { PortfolioItemInterface } from '../PortfolioItems/PortfolioItemInterface';
import VideoModal from './VideoModal';

export interface Props {
  portfolioItems: PortfolioItemInterface[];
}

const Players: FC<Props> = (props) => {
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
    <>
      <div
        onTouchStart={handleFirstUserInteraction}
        onClick={handleFirstUserInteraction}
      >
        <HomeAudio></HomeAudio>
        <HomeExperience></HomeExperience>
        <HomePortfolio
          setPlayingPortfolioItem={setPlayingPortfolioItem}
          portfolioItems={props.portfolioItems}
        ></HomePortfolio>
        {/* <AudioWaveform
          portfolioItem={playingPortfolioItem}
          mediaElement={mediaElement}
        ></AudioWaveform> */}
        <VideoModal
          portfolioItem={playingPortfolioItem}
          setPortfolioItem={setPlayingPortfolioItem}
        ></VideoModal>
      </div>
    </>
  );
};

export default Players;
