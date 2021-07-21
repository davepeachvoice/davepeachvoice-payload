import React, { CSSProperties, useState, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import styled from 'styled-components';
import { PortfolioItemDataInterface } from './PortfolioItemInterface';

// https://codesandbox.io/s/agitated-shockley-cdzuy?file=/src/components/record-button.tsx:1574-1575

const RED_COLOR = `#FF214D`;

const DetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2.5em 6px 0 6px;
  line-height: 1.4;
`;

const MediumText = styled.span`
  font-size: 18px;
  color: #fff;
  font-weight: 800;
  text-transform: uppercase;
`;

const SmallText = styled.span`
  font-size: 11px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
`;

const SpacedHorizontalContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButton = styled(motion.div)`
  padding: 10px 16px;
  background-color: #fbbe01;
  transition: all 290ms ease-in-out;
  color: #000;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  border: 3px solid transparent;
  outline: none;
  cursor: pointer;
  border-radius: 8px;
  align-self: flex-end;
  &:hover {
    background-color: transparent;
    color: #fff;
    border: 3px solid #fbbe01;
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 30px;
  bottom: 0;
`;

const outerCircleVariants: Variants = {
  circle: {
    transform: 'scale(1)',
    opacity: 0.5,
    boxShadow: `0px 0px 0px 10px ${RED_COLOR}`,
  },
  largeCircle: {
    transform: 'scale(1.1)',
    opacity: 1,
    boxShadow: `0px 0px 0px 10px ${RED_COLOR}`,
  },
};

const innerCircleVariants: Variants = {
  circle: {
    y: 0,
    borderRadius: '10px',
  },
  square: {
    y: -10,
    borderRadius: '40px',
  },
};
interface RecordButtonProps {
  item: PortfolioItemDataInterface;
  onClick: () => void;
}

export const RecordButton = (props: RecordButtonProps) => {
  const [hover, setHover] = useState<boolean>(false);
  const innerCircleAnimation = useAnimation();
  const outerCircleAnimation = useAnimation();

  const item = props.item;
  const playButtonStidfaskldfajsdflkajsdflkajsdflkd =
    item.mediaType == 'audio' ? 'Listen' : 'Watch';
  useEffect(() => {
    (async () => {
      if (hover) {
        Promise.all([
          outerCircleAnimation.start('largeCircle'),
          innerCircleAnimation.start('square'),
        ]);
      } else {
        Promise.all([
          outerCircleAnimation.start('circle'),
          innerCircleAnimation.start('circle'),
        ]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hover]);

  return (
    <motion.div
      drag
      style={styles.container}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.div
        initial='circle'
        animate={outerCircleAnimation}
        variants={outerCircleVariants}
        style={{ ...styles.circle, ...styles.outerCircle }}
      >
        <Details>
          <div>{item.title}</div>
          <ActionButton
            initial='circle'
            animate={innerCircleAnimation}
            variants={innerCircleVariants}
            style={{ ...styles.circle, ...styles.innerCircle }}
          >
            {playButtonStidfaskldfajsdflkajsdflkajsdflkd}
          </ActionButton>
        </Details>
      </motion.div>
      {/* <motion.div
        initial="circle"
        animate={innerCircleAnimation}
        variants={innerCircleVariants}
        style={{ ...styles.circle, ...styles.innerCircle }}
      /> */}
    </motion.div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 285,
    height: 175,
    alignSelf: 'center',
    justifySelf: 'center',
    flexDirection: 'column',
    padding: '2.5em 6px 0 6px',
    lineHeight: '1.4',
  },
  circle: {},
  outerCircle: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 0,
    flexDirection: 'column',
    padding: '2.5em 6px 0 6px',
    lineHeight: '1.4',
  },
};

export default RecordButton;
