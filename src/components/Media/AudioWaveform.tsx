import { PortfolioItemInterface } from '@components/PortfolioItems/PortfolioItemInterface';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { WaveSurfer, WaveForm } from 'wavesurfer-react';

const Buttons = styled.div`
  display: inline-block;
`;

const Button = styled.button``;

interface Props {
  portfolioItem: PortfolioItemInterface;
}

export default function Waveform(props: Props) {
  const [currentAudioSource, setCurrentAudioSource] = useState<string>(null);

  const wavesurferRef = useRef<WaveSurfer>();

  function handleWSMount(waveSurfer, audioSource) {
    console.log('handling mount');
    wavesurferRef.current = waveSurfer;
    if (wavesurferRef.current && audioSource) {
      wavesurferRef.current.load(audioSource);

      wavesurferRef.current.on('ready', () => {
        console.log('WaveSurfer is ready');
        wavesurferRef.current.playPause();
      });

      wavesurferRef.current.on('region-removed', (region) => {
        console.log('region-removed --> ', region);
      });

      wavesurferRef.current.on('loading', (data) => {
        console.log('loading --> ', data);
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

  return (
    <div className='App' style={{ backgroundColor: 'white' }}>
      {currentAudioSource}
      <WaveSurfer
        key={currentAudioSource}
        onMount={(waveSurfer) => handleWSMount(waveSurfer, currentAudioSource)}
      >
        <WaveForm
          barWidth={3}
          hideScrollbar={true}
          responsive={true}
          height={75}
        ></WaveForm>
      </WaveSurfer>
      <Buttons>
        <Button onClick={play}>Play / Pause</Button>
      </Buttons>
    </div>
  );
}
