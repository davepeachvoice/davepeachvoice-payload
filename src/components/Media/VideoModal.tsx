import { PortfolioItemInterface } from '@components/PortfolioItems/PortfolioItemInterface';
import { Box, Layer } from 'grommet';
import { FormClose } from 'grommet-icons';
import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

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
        <Layer
          onEsc={closeModal}
          onClickOutside={closeModal}
          full
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ top: 0, right: 0, position: 'absolute' }}>
            <FormClose size='large' onClick={closeModal}></FormClose>
          </div>

          <Box responsive margin='large' width='xlarge' height='large'>
            <ReactPlayer
              url={currentVideoSource}
              playing={true}
              controls={true}
              width='100%'
              height='100%'
            />
          </Box>
        </Layer>
      )}
    </Box>
  );
}
