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

import React, { useState } from 'react';
import AudioVisualizer from './AudioVisualizer';
import soundFile from './audio/bensound-dubstep.mp3';

export default function AudioDataContainer() {
  const [audioData, setAudioData] = useState<AnalyserNode>(null);
  const [audioFile, setAudioFile] = useState<HTMLAudioElement>(null);
  const [initialized, setInitialized] = useState(false);
  const frequencyBandArray = [...Array(25).keys()];

  function initializeAudioAnalyser() {
    const localAudioFile = new Audio();

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(localAudioFile);
    const analyser = audioContext.createAnalyser();
    localAudioFile.src = soundFile;
    analyser.fftSize = 64;
    source.connect(audioContext.destination);
    source.connect(analyser);
    localAudioFile.play();
    setAudioFile(localAudioFile);

    console.log(analyser);
    setAudioData(analyser);

    console.log('audio analyer initialized');

    setInitialized(true);
  }

  function pause() {
    console.log('pausing');
    audioFile.pause();
  }

  function play() {
    audioFile.play();
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
      audioDataContainerInitialized={initialized}
    />
  );
}
