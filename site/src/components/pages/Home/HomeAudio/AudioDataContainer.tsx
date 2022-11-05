'use client';

// MIT License

// Copyright (c) 2019 strengthmate

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// https://betterprogramming.pub/using-react-ui-components-to-visualize-real-time-spectral-data-of-an-audio-source-17a498a6d8d7
// https://github.com/matt-eric/web-audio-fft-visualization-with-react-hooks

import React from 'react';
import { FaMicrophone, FaPauseCircle } from 'react-icons/fa';
import { attributes as HomeContentAttributes } from '../../../../../content/home.md';
import AudioVisualizer from './AudioVisualizer';

export default function AudioDataContainer() {
  const audioFile = React.useRef<HTMLAudioElement>(undefined);
  const audioData = React.useRef<AnalyserNode>(undefined);
  const [isPlaying, setIsPlaying] = React.useState(false);

  function initializeAudioAnalyser() {
    audioFile.current = new Audio();

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audioFile.current);
    audioData.current = audioContext.createAnalyser();

    audioFile.current.crossOrigin = 'anonymous';
    audioFile.current.src =
      'https://res.cloudinary.com/prestocloud/video/upload/v1635110958/dave-peach-web-netlify-cms/commercial-sample_v49stm.mp3';
    audioData.current.fftSize = 64;

    source.connect(audioContext.destination);
    source.connect(audioData.current);

    audioFile.current.play();
    setIsPlaying(true);
  }

  function pause() {
    audioFile.current.pause();
    setIsPlaying(false);
  }

  function getFrequencyData(styleAdjuster) {
    const bufferLength = audioData.current.frequencyBinCount;
    const amplitudeArray = new Uint8Array(bufferLength);
    audioData.current.getByteFrequencyData(amplitudeArray);
    styleAdjuster(amplitudeArray);
  }

  function toggleAudio() {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      initializeAudioAnalyser();
      setIsPlaying(true);
    }
  }

  return (
    <>
      <div>
        <div>
          {isPlaying && <AudioVisualizer getFrequencyData={getFrequencyData} />}
          <div className='h-full'>
            <div
              className='text-base md:text-xl m-6 align-center'
              // level={1}
              // size='large'
              // margin='large'
              // textAlign='center'
            >
              {HomeContentAttributes.hero_main_text}
            </div>
          </div>
        </div>
      </div>
      <div className='flex-row justify-between items-center align-center h-12 bg-white'>
        <div style={{ paddingLeft: '20px' }}>
          <div className='md:text-lg'>
            {HomeContentAttributes.hero_sub_text}
          </div>
        </div>
        <div
          className='tagline-container'
          style={{ paddingRight: '20px' }}
          onClick={toggleAudio}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <div className='md:text-lg'>
                {HomeContentAttributes.audio_sample_text}
              </div>
            </div>
            {isPlaying ? (
              <FaPauseCircle color='white' />
            ) : (
              <FaMicrophone color='white' />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
