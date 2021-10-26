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
import AudioVisualizer from './AudioVisualizer';

export default function AudioDataContainer() {
  const frequencyBandArray = [...Array(25).keys()];
  let audioFile: HTMLAudioElement;
  let audioData: AnalyserNode;

  function initializeAudioAnalyser() {
    audioFile = new Audio();

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audioFile);
    audioData = audioContext.createAnalyser();

    audioFile.crossOrigin = 'anonymous';
    audioFile.src =
      'https://res.cloudinary.com/prestocloud/video/upload/v1635110958/dave-peach-web-netlify-cms/commercial-sample_v49stm.mp3';
    audioData.fftSize = 64;

    source.connect(audioContext.destination);
    source.connect(audioData);

    audioFile.play();
  }

  function pause() {
    console.log('pausing');
    audioFile.pause();
  }

  function isPlaying() {
    return audioFile?.duration > 0 && !audioFile.paused;
  }

  function getFrequencyData(styleAdjuster) {
    const bufferLength = audioData.frequencyBinCount;
    const amplitudeArray = new Uint8Array(bufferLength);
    audioData.getByteFrequencyData(amplitudeArray);
    styleAdjuster(amplitudeArray);
  }

  return (
    <AudioVisualizer
      initializeAudioAnalyser={initializeAudioAnalyser}
      frequencyBandArray={frequencyBandArray}
      getFrequencyData={getFrequencyData}
      isPlaying={isPlaying}
      pause={pause}
    />
  );
}
