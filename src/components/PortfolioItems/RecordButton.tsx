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
  background-color: #eee;
  transition: all 290ms ease-in-out;
  color: #444;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  border: 3px solid transparent;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  align-self: flex-end;
  position: absolute;
  bottom: 16px;
  right: 16px;
  &:hover {
    background-color: #ccc;
    color: #272727;
    /* border: 3px solid #fbbe01; */
  }
`;

const Details = styled.div`
  justify-content: space-between;
  padding: 16px 16px;
  width: calc(100% - 32px);
  height: calc(100% - 32px);
`;

const cardVariants: Variants = {
  card: {
    transform: 'scale(1)',
    boxShadow:
      'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
  },
  largeCard: {
    transform: 'scale(1.1)',
    boxShadow:
      'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
  },
};

const innerCircleVariants: Variants = {
  circle: {
    y: 0,
  },
};
interface RecordButtonProps {
  item: PortfolioItemDataInterface;
  onClick: () => void;
}

export const RecordButton = (props: RecordButtonProps) => {
  const [hover, setHover] = useState<boolean>(false);
  const cardFocusAnimation = useAnimation();

  const item = props.item;
  const playButtonStidfaskldfajsdflkajsdflkajsdflkd =
    item.media_type == 'audio' ? 'Listen' : 'Watch';
  useEffect(() => {
    (async () => {
      if (hover) {
        Promise.all([cardFocusAnimation.start('largeCard')]);
      } else {
        Promise.all([cardFocusAnimation.start('card')]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hover]);

  //        ***********
  //     ***          ****
  //    **               **
  //   ***********         *
  //  *           *        ****
  //  *           *        *   *
  //   ***********         *   *
  //    *                  *   *
  //    *                  *   *
  //    *                  *   *
  //    *      ******      ****
  //    *     *      *     *
  //    *     *      *     *
  //      ****         ****

  return (
    <motion.div
      style={styles.container}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.div
        initial='card'
        animate={cardFocusAnimation}
        variants={cardVariants}
        style={{
          backgroundImage: `url("${item.thumbnail_source}")`,
          ...styles.circle,
          ...styles.outerCircle,
        }}
      >
        <Details>
          <div style={styles.cardTitle}>{item.title}</div>
          <ActionButton
            initial='circle'
            variants={innerCircleVariants}
            style={{ ...styles.circle, ...styles.innerCircle }}
            onClick={props.onClick}
          >
            <span style={styles.playButton}>▶</span>&nbsp;&nbsp;&nbsp;
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
    padding: '0',
    lineHeight: '1.4',
  },
  circle: {},
  outerCircle: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: '5px',
    padding: '0',
    lineHeight: '1.4',
    backgroundColor: '#222',
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  cardTitle: {
    color: '#EEE',
    fontSize: '24px',
  },
  playButton: {
    fontFamily: 'helvetica neue,Helvetica,Arial,sans-serif',
  },
};

export default RecordButton;
