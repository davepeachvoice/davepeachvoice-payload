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
  const [show, setShow] = useState(false);

  const openModal = useCallback(() => {
    setShow(true);
  }, []);

  const closeModal = useCallback(() => {
    props.setPortfolioItem(null);
    setShow(false);
  }, [props]);

  useEffect(() => {
    const videoPortfolioItemIsPresent =
      props.portfolioItem && props.portfolioItem.media_type === 'video';

    if (!videoPortfolioItemIsPresent) {
      closeModal();
      return;
    }

    setCurrentVideoSource(props.portfolioItem.media_source);

    openModal();
  }, [props.portfolioItem, openModal, closeModal]);

  return (
    <Box>
      {show && (
        <Layer onEsc={closeModal} onClickOutside={closeModal}>
          <ReactPlayer
            url={currentVideoSource}
            playing={true}
            controls={true}
          />
        </Layer>
      )}
    </Box>
  );
}
