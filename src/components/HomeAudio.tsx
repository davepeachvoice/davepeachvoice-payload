import React, { useState, useEffect } from "react";
import { Heading, Box, Button, Stack } from "grommet";
import styled from "styled-components";
import { Play } from "grommet-icons";

import { motion } from "framer-motion";
import AudioVisualizer from "./AudioVisualizer";

import { attributes } from "@content/home.md";

export const Pulsate = (props) => (
  <motion.div
    whileHover={{
      scale: [1, 1.1, 1],
      transition: {
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        loop: Infinity,
        repeatDelay: 0,
      },
    }}
  >
    {" "}
    {props.children}
  </motion.div>
);

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
  padding: 10px;
`;

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
    const localAudio: React.DetailedHTMLProps<
      React.AudioHTMLAttributes<HTMLAudioElement>,
      HTMLAudioElement
    > = document.getElementById("audio");
    console.log(audioFile);
    localAudio.src = URL.createObjectURL(audioFile[0]);
    localAudio.load();
    localAudio.play();
    setAudio(localAudio);
    setPlayingAudio(true);
  }, [audioFile]);

  return (
    <>
      <Box>
        <Stack guidingChild="last">
          <Box fill>
            <AudioVisualizer
              audio={audio}
              playing={playingAudio}
            ></AudioVisualizer>
          </Box>
          <Box
            align="center"
            justify="center"
            background={{ color: "brand", opacity: "weak" }}
          >
            <Heading size="large" margin="large">
              {hero_main_text}
            </Heading>
          </Box>
        </Stack>
        <Box gridArea="tagline">{hero_sub_text}</Box>
        <ButtonWithIcon
          onMouseEnter={() => setAnimateButton(true)}
          onMouseLeave={() => setAnimateButton(false)}
          gridArea="button"
        >
          <div>{audio_sample_text}</div>
          <Pulsate>
            <Circle>
              <Play></Play>
            </Circle>
          </Pulsate>
        </ButtonWithIcon>

        <input
          type="file"
          onChange={(event) => setAudioFile(event.target.files)}
          id="thefile"
          accept="audio/*"
        />
        <Button onClick={() => setPlayingAudio(false)}></Button>
        <audio id="audio" controls></audio>
      </Box>
    </>
  );
};

export default HomeAudio;