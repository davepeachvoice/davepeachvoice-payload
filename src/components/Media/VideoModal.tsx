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

  const handleVisibility = useCallback(
    (visibility: boolean) => {
      console.log('handleVisibility');
      if (!visibility) {
        console.log('setting to null!!!');
        props.setPortfolioItem(null);
      }

      setPlaying(visibility);
      setShow(visibility);
    },
    [props]
  );

  useEffect(() => {
    console.log('effect');
    if (!props.portfolioItem) {
      console.log('nothing to do');
      return;
    }

    if (props.portfolioItem.media_type !== 'video') {
      console.log('nothing to do');
      handleVisibility(false);
      return;
    }

    console.log('got new portfolio item');
    setCurrentVideoSource(props.portfolioItem.media_source);
    handleVisibility(true);
  }, [props.portfolioItem, handleVisibility]);

  return (
    <Box>
      {show && (
        <Layer
          onEsc={() => handleVisibility(false)}
          onClickOutside={() => handleVisibility(false)}
        >
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
