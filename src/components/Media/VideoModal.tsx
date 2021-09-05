import React, { useState, useEffect } from 'react';
import { PortfolioItemInterface } from '@components/PortfolioItems/PortfolioItemInterface';
import ReactPlayer from 'react-player';
import { Button, Box, Layer } from 'grommet';

interface Props {
  portfolioItem: PortfolioItemInterface;
}

export default function VideoModal(props: Props) {
  const [currentVideoSource, setCurrentVideoSource] = useState<string>(null);
  const [playing, setPlaying] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!props.portfolioItem) {
      return;
    }

    if (props.portfolioItem.media_type !== 'video') {
      setPlaying(false);
      setShow(false);
      setCurrentVideoSource(null);
      return;
    }

    setCurrentVideoSource(props.portfolioItem.media_source);
    setShow(true);
    setPlaying(true);
  }, [props.portfolioItem]);

  return (
    <Box>
      <Button label='show' onClick={() => setShow(true)} />
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Button label='close' onClick={() => setShow(false)} />
          <ReactPlayer url={currentVideoSource} playing={playing} />
        </Layer>
      )}
    </Box>
  );
}
