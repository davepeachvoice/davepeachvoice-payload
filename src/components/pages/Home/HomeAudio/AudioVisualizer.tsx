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

import React, { useRef } from 'react';
import styles from './styles/VisualDemo.module.scss';
import { Stack, Box, Heading, Button } from 'grommet';
import { attributes as HomeContentAttributes } from '@content/home.md';
import styled from 'styled-components';
import { Microphone } from 'grommet-icons';
import { motion } from 'framer-motion';

const Circle = styled.div`
  position: relative;
  border-radius: 50%;
  background-color: black;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  margin-left: 10px;
`;

const ButtonWithIcon = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  right: 0;
  gap: 10px;
`;

const TaglineContainerLine = styled.div`
  width: 112px;
  height: 47px;
  border-bottom: 1px solid red;
  -webkit-transform: translateY(-20px) translateX(5px) rotate(27deg);
`;

const TaglineContainer = styled.div`
  height: 100%;
  background: #d9b596;
  clip-path: polygon(17% 0, 100% 0, 100% 100%, 0% 100%);
  width: 300px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
    transform: translate3d(0px, -1px, 0px);
  }
`;

export const Pulsate = (props) => (
  <motion.div
    whileHover={{
      scale: [1, 1.1, 1],
      transition: {
        duration: 1,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
        loop: Infinity,
        repeatDelay: 0,
      },
    }}
  >
    {' '}
    {props.children}
  </motion.div>
);

export default function VisualDemo(props) {
  const amplitudeValues = useRef(null);

  function adjustFreqBandStyle(newAmplitudeData) {
    amplitudeValues.current = newAmplitudeData;
    const domElements = props.frequencyBandArray.map((num) =>
      document.getElementById(num)
    );
    for (let i = 0; i < props.frequencyBandArray.length; i++) {
      const num = props.frequencyBandArray[i];
      domElements[num].style.backgroundColor = `rgb(25, ${
        amplitudeValues.current[num] / 3
      }, ${amplitudeValues.current[num] / 3})`;
      const percentage = (amplitudeValues.current[num] / 255) * 100;
      domElements[num].style.height = `${percentage}%`;
    }
  }

  function runSpectrum() {
    props.getFrequencyData(adjustFreqBandStyle);
    requestAnimationFrame(runSpectrum);
  }

  function handleStartButtonClick() {
    props.initializeAudioAnalyser();
    requestAnimationFrame(runSpectrum);
  }

  return (
    <div>
      <Stack guidingChild='last'>
        <div className={styles.flexContainer}>
          {props.frequencyBandArray.map((num) => (
            <div className={styles.frequencyBands} id={num} key={num} />
          ))}
        </div>
        <Box background={{ color: 'brand', opacity: 'weak' }} height='100%'>
          <Heading size='large' margin='large' textAlign='center'>
            {HomeContentAttributes.hero_main_text}
          </Heading>
        </Box>
      </Stack>
      <Box
        direction='row'
        justify='between'
        align='center'
        height='50px'
        background={{ color: 'white' }}
      >
        <Box style={{ paddingLeft: '20px' }}>
          {HomeContentAttributes.hero_sub_text}
        </Box>
        <TaglineContainer
          style={{ paddingRight: '20px' }}
          onClick={() => handleStartButtonClick()}
        >
          <ButtonWithIcon>
            <div>{HomeContentAttributes.audio_sample_text}</div>
            <Microphone></Microphone>
          </ButtonWithIcon>
        </TaglineContainer>
      </Box>
    </div>
  );
}
