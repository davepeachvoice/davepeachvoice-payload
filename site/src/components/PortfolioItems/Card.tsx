'use client';

import { CSSProperties, useState } from 'react';
import { PortfolioItemDataInterface } from './PortfolioItemInterface';

interface CardProps {
  item: PortfolioItemDataInterface;
  onClick: () => void;
}

export const Card = (props: CardProps) => {
  const [hover, setHover] = useState<boolean>(false);

  const item = props.item;
  const playButtonStidfaskldfajsdflkajsdflkajsdflkd =
    item.media_type == 'audio' ? 'Listen' : 'Watch';

  return (
    <div
      style={styles.container}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          backgroundImage: `url("${item.thumbnail_source}")`,
          ...styles.circle,
          ...styles.outerCircle,
        }}
      >
        <div className='details'>
          <div style={styles.cardTitle}>{item.title}</div>
          <div
            className='action-button'
            style={{ ...styles.circle, ...styles.innerCircle }}
            onClick={props.onClick}
          >
            <span style={styles.playButton}>▶</span>&nbsp;&nbsp;&nbsp;
            {playButtonStidfaskldfajsdflkajsdflkajsdflkd}
          </div>
        </div>
      </div>
      {/* <motion.div
        initial="circle"
        animate={innerCircleAnimation}
        variants={innerCircleVariants}
        style={{ ...styles.circle, ...styles.innerCircle }}
      /> */}
    </div>
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

export default Card;
