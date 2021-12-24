import { PortfolioItemInterface } from '@components/PortfolioItems/PortfolioItemInterface';
import { Button } from 'grommet';
import { Down, PauseFill, PlayFill } from 'grommet-icons';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { WaveForm, WaveSurfer } from 'wavesurfer-react';

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;

const CircleButton = styled(Button)`
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
  const HEIGHT = 75;

  const [currentAudioSource, setCurrentAudioSource] = useState<string>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [bottomPosition, setBottomPosition] = useState<number>(-HEIGHT);

  const wavesurferRef = useRef<WaveSurfer>();

  function handleWSMount(waveSurfer, audioSource) {
    console.debug('handling mount');

    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    wavesurferRef.current = waveSurfer;
    if (wavesurferRef.current && audioSource) {
      show();

      wavesurferRef.current.load(audioSource);

      wavesurferRef.current.on('ready', () => {
        console.debug('WaveSurfer is ready');
        wavesurferRef.current.play();
      });

      wavesurferRef.current.on('region-removed', (region) => {
        console.debug('region-removed --> ', region);
      });

      wavesurferRef.current.on('loading', (data) => {
        console.debug('loading --> ', data);
      });

      wavesurferRef.current.on('pause', () => {
        setPlaying(false);
      });

      wavesurferRef.current.on('play', () => {
        setPlaying(true);
      });
    }
  }

  function pause() {
    wavesurferRef.current.pause();
  }

  function togglePlay() {
    wavesurferRef.current.playPause();
  }

  function hide() {
    setCurrentAudioSource(null);
    setBottomPosition(-HEIGHT);
  }

  function show() {
    setBottomPosition(0);
  }

  useEffect(() => {
    console.debug('audiowaveform found a new portfolioitem');
    console.debug('audio: %s', JSON.stringify(props.portfolioItem));
    if (!props.portfolioItem) {
      return;
    }

    if (props.portfolioItem.media_type !== 'audio') {
      setCurrentAudioSource(null);
      return;
    }

    setCurrentAudioSource(props.portfolioItem.media_source);
  }, [props.portfolioItem]);

  return (
    <div
      className='App'
      style={{
        height: `${HEIGHT}px`,
        position: 'fixed',
        left: 0,
        bottom: bottomPosition,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'black',
        gap: '20px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <Buttons>
        <CircleButton onClick={togglePlay}>
          {playing ? (
            <PauseFill style={{ marginLeft: '0' }} size='medium'></PauseFill>
          ) : (
            <PlayFill style={{ marginLeft: '5px' }} size='medium'></PlayFill>
          )}
        </CircleButton>
      </Buttons>
      <div style={{ backgroundColor: 'black', width: '100%' }}>
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
            height={50}
            barHeight={4}
            barGap={1}
            normalize={true}
            minPxPerSec={100}
            mediaControls={true}
            waveColor='var(--status-ok)'
          ></WaveForm>
        </WaveSurfer>
      </div>
      <Button
        onClick={() => {
          pause();
          hide();
        }}
      >
        <Down style={{ width: '35px', height: '35px' }}></Down>
      </Button>
    </div>
  );
}
