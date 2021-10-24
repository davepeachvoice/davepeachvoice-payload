import { PortfolioItemInterface } from '@components/PortfolioItems/PortfolioItemInterface';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { WaveSurfer, WaveForm } from 'wavesurfer-react';
import { PlayFill, PauseFill } from 'grommet-icons';
import { Button } from 'grommet';

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;

const LocalButton = styled(Button)`
  outline: none;
  border: none;
  background: #444;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  portfolioItem: PortfolioItemInterface;
}

export default function Waveform(props: Props) {
  const [currentAudioSource, setCurrentAudioSource] = useState<string>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [bottomPosition, setBottomPosition] = useState<number>(-125);

  const wavesurferRef = useRef<WaveSurfer>();

  function handleWSMount(waveSurfer, audioSource) {
    console.log('handling mount');

    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    wavesurferRef.current = waveSurfer;
    if (wavesurferRef.current && audioSource) {
      wavesurferRef.current.load(audioSource);

      wavesurferRef.current.on('ready', () => {
        console.log('WaveSurfer is ready');
        wavesurferRef.current.play();
      });

      wavesurferRef.current.on('region-removed', (region) => {
        console.log('region-removed --> ', region);
      });

      wavesurferRef.current.on('loading', (data) => {
        console.log('loading --> ', data);
      });

      wavesurferRef.current.on('pause', () => {
        setPlaying(false);
      });

      wavesurferRef.current.on('play', () => {
        setPlaying(true);
      });
    }
  }

  const play = useCallback(() => {
    wavesurferRef.current.playPause();
  }, []);

  useEffect(() => {
    console.log('audiowaveform found a new portfolioitem');
    console.log('audio: %s', JSON.stringify(props.portfolioItem));
    if (!props.portfolioItem) {
      return;
    }

    if (props.portfolioItem.media_type !== 'audio') {
      setCurrentAudioSource(null);
      return;
    }

    setCurrentAudioSource(props.portfolioItem.media_source);
  }, [props.portfolioItem]);

  // useEffect(() => {
  //   if (playing) {
  //     setBottomPosition(0);
  //   } else {
  //     setBottomPosition(-125);
  //   }
  // }, [playing]);

  return (
    <div
      className='App'
      style={{
        backgroundColor: 'white',
        height: '125px',
        position: 'fixed',
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <div style={{ marginTop: '10px' }}>
        <WaveSurfer
          key={currentAudioSource}
          onMount={(waveSurfer) =>
            handleWSMount(waveSurfer, currentAudioSource)
          }
        >
          <WaveForm
            barWidth={1}
            hideScrollbar={true}
            responsive={true}
            height={75}
            barHeight={4}
            barGap={1}
            normalize={true}
            minPxPerSec={100}
            mediaControls={true}
          ></WaveForm>
        </WaveSurfer>
        <Buttons>
          <LocalButton onClick={play}>
            {playing ? (
              <PauseFill style={{ marginLeft: '0' }} size='medium'></PauseFill>
            ) : (
              <PlayFill style={{ marginLeft: '5px' }} size='medium'></PlayFill>
            )}
          </LocalButton>
        </Buttons>
      </div>
    </div>
  );
}
