import React from 'react';
import styled from 'styled-components';
// import circle from "!!raw-loader!./circle.svg";
// import circleRings from "!!raw-loader!./circle-rings.svg";
import Svg from '../Svg/Svg';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

const Root = styled.div`
  position: relative;
  display: flex;
  flex-flow: column wrap;
  align-items: space-around;
  justify-content: center;
  align-items: center;
  padding-top: 25vh;
  z-index: 1;
`;

const Container = styled.div`
  position: relative;
  width: 30em;
`;

const Circle = styled(Parallax)``;

const CircleRings = styled(Parallax)`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
`;

const ParallaxOverlap = () => (
  <ParallaxProvider>
    <Root>
      <Container>
        <Circle className='parallax' y={[-20, 20]} tagOuter='figure'>
          {/* <Svg svg={circle} /> */}
        </Circle>
        <CircleRings x={[-20, 20]}>
          {/* <Svg svg={circleRings} /> */}
        </CircleRings>
      </Container>
    </Root>
  </ParallaxProvider>
);

export default ParallaxOverlap;
