'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef, useState } from 'react';
import { FaArrowDown, FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { PortfolioItemInterface } from '../PortfolioItems/PortfolioItemInterface';

const WaveForm = dynamic(
  () => import('wavesurfer-react').then((mod) => mod.WaveForm),
  {
    suspense: true,
    ssr: false,
  }
);
const WaveSurfer = dynamic(
  () => import('wavesurfer-react').then((mod) => mod.WaveSurfer),
  {
    suspense: true,
    ssr: false,
  }
);

interface Props {
  portfolioItem: PortfolioItemInterface;
  mediaElement: HTMLAudioElement;
}

export default function AudioWaveform(props: Props) {
  const HEIGHT = 75;

  const [currentAudioSource, setCurrentAudioSource] = useState<string>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [bottomPosition, setBottomPosition] = useState<number>(-HEIGHT);

  const wavesurferRef = useRef<WaveSurfer>();

  function handleWSMount(waveSurfer: WaveSurfer, audioSource: string) {
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    wavesurferRef.current = waveSurfer;
    if (wavesurferRef.current && audioSource) {
      show();

      // part of solution to Safari not working on initial MediaElement .play()
      // wavesurferRef.current.load(props.mediaElement);

      wavesurferRef.current.load(audioSource);

      wavesurferRef.current.on('ready', () => {
        wavesurferRef.current.play();
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
    if (!props.portfolioItem) {
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          onClick={togglePlay}
          style={{
            outline: 'none',
            border: 'none',
            background: '#444',
            borderRadius: '100%',
            width: '40px',
            height: '40px',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {playing ? (
            <FaPauseCircle style={{ marginLeft: '0' }} size='medium' />
          ) : (
            <FaPlayCircle style={{ marginLeft: '5px' }} size='medium' />
          )}
        </div>
      </div>
      <div style={{ backgroundColor: 'black', width: '100%' }}>
        <Suspense>
          <WaveSurfer
            key={currentAudioSource}
            onMount={(waveSurfer: WaveSurfer) =>
              handleWSMount(waveSurfer, currentAudioSource)
            }
            plugins={[]}
          >
            <WaveForm
              id='waveform'
              barWidth={1}
              hideScrollbar={true}
              responsive={true}
              height={50}
              barHeight={4}
              barGap={1}
              normalize={true}
              minPxPerSec={100}
              backend='MediaElement'
              waveColor='white'
            ></WaveForm>
          </WaveSurfer>
        </Suspense>
      </div>
      <button
        onClick={() => {
          pause();
          hide();
        }}
      >
        <FaArrowDown style={{ width: '35px', height: '35px' }} />
      </button>
    </div>
  );
}
