import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { WaveSurfer, WaveForm } from 'wavesurfer-react';

const Buttons = styled.div`
  display: inline-block;
`;

const Button = styled.button``;

export default function Waveform() {
  const wavesurferRef = useRef<WaveSurfer>();
  const handleWSMount = useCallback((waveSurfer) => {
    wavesurferRef.current = waveSurfer;
    if (wavesurferRef.current) {
      wavesurferRef.current.load(
        'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3'
      );

      wavesurferRef.current.on('ready', () => {
        console.log('WaveSurfer is ready');
      });

      wavesurferRef.current.on('region-removed', (region) => {
        console.log('region-removed --> ', region);
      });

      wavesurferRef.current.on('loading', (data) => {
        console.log('loading --> ', data);
      });

      if (window) {
        window.surferidze = wavesurferRef.current;
      }
    }
  }, []);

  const play = useCallback(() => {
    wavesurferRef.current.playPause();
  }, []);

  return (
    <div className='App' style={{ backgroundColor: 'white' }}>
      <WaveSurfer onMount={handleWSMount}>
        <WaveForm id='waveform'></WaveForm>
        <div id='timeline' />
      </WaveSurfer>
      <Buttons>
        <Button onClick={play}>Play / Pause</Button>
      </Buttons>
    </div>
  );
}
