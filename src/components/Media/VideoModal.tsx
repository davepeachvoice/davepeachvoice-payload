import React, { useState, useEffect, useCallback } from 'react';
import { PortfolioItemInterface } from '@components/PortfolioItems/PortfolioItemInterface';
import ReactPlayer from 'react-player';
import { Box, Layer } from 'grommet';

interface Props {
  portfolioItem: PortfolioItemInterface;
  setPortfolioItem: React.Dispatch<
    React.SetStateAction<PortfolioItemInterface>
  >;
}

export default function VideoModal(props: Props) {
  const [currentVideoSource, setCurrentVideoSource] = useState<string>(null);
  const [playing, setPlaying] = useState(false);
  const [show, setShow] = useState(false);

  const openModal = useCallback(() => {
    setPlaying(true);
    setShow(true);
  }, []);

  const closeModal = useCallback(() => {
    props.setPortfolioItem(null);
    setShow(false);
    setPlaying(false);
  }, [props]);

  useEffect(() => {
    console.log('effect');
    if (!props.portfolioItem) {
      console.log('nothing to do');
      return;
    }

    if (props.portfolioItem.media_type !== 'video') {
      console.log('nothing to do');
      closeModal();
      return;
    }

    console.log('got new portfolio item');
    setCurrentVideoSource(props.portfolioItem.media_source);

    openModal();
  }, [props.portfolioItem, openModal, closeModal]);

  return (
    <Box>
      {show && (
        <Layer onEsc={closeModal} onClickOutside={closeModal}>
          <ReactPlayer
            url={currentVideoSource}
            playing={playing}
            controls={true}
          />
        </Layer>
      )}
    </Box>
  );
}
