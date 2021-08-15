import React, { useState, useEffect } from 'react';
import { Heading, Box, Button, Stack } from 'grommet';
import styled from 'styled-components';
import { Play } from 'grommet-icons';
import AudioDataContainer from '../HomeAudio2/AudioDataContainer';

import { motion } from 'framer-motion';
import AudioVisualizer from './AudioVisualizer';

import { attributes } from '@content/home.md';

// const ContainerVariants = {
//   contracted: {},
//   expanded: {
//     borderRadius: "0px",
//   },
// };

const HomeAudio = () => {
  const [animateButton, setAnimateButton] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);
  const [audio, setAudio] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const { hero_main_text, hero_sub_text, audio_sample_text } = attributes;

  useEffect(() => {
    console.log(audioFile);
    if (audioFile === null) return;
    // TODO: type this (something like React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>,HTMLAudioElement> but where ContentEditable works)
    const localAudio: any = document.getElementById('audio');
    console.log(audioFile);
    localAudio.src = URL.createObjectURL(audioFile[0]);
    localAudio.load();
    localAudio.play();
    setAudio(localAudio);
    setPlayingAudio(true);
  }, [audioFile]);

  function playAudio() {
    console.log('playing audio');
    setPlayingAudio(true);
  }

  return (
    <>
      <Box>
        <AudioDataContainer></AudioDataContainer>

        <Button onClick={() => setPlayingAudio(false)}></Button>
        <audio id='audio' controls></audio>
      </Box>
    </>
  );
};

export default HomeAudio;
