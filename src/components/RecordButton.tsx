import React, { CSSProperties, useState, useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";

const RED_COLOR = `#FF214D`;

const outerCircleVariants: Variants = {
  circle: {
    transform: "scale(1)",
    opacity: 0.5,
    boxShadow: `0px 0px 0px 10px ${RED_COLOR}`,
  },
  largeCircle: {
    transform: "scale(2)",
    opacity: 1,
    boxShadow: `0px 0px 0px 10px ${RED_COLOR}`,
  },
  pulseIn: {
    transform: "scale(2)",
    opacity: 1,
    boxShadow: `0px 0px 0px 20px ${RED_COLOR}`,
  },
  pulseOut: {
    transform: "scale(2)",
    opacity: 1,
    boxShadow: `0px 0px 0px 10px ${RED_COLOR}`,
  },
};

const innerCircleVariants: Variants = {
  circle: {
    transform: "scale(1)",
    borderRadius: "100%",
  },
  square: {
    transform: "scale(0.8)",
    borderRadius: "30%",
  },
  invisible: {
    transform: "scale(0)",
    borderRadius: "100%",
  },
};

export const RecordButton = () => {
  const [hover, setHover] = useState<boolean>(false);
  const innerCircleAnimation = useAnimation();
  const outerCircleAnimation = useAnimation();

  useEffect(() => {
    (async () => {
      if (hover) {
        await outerCircleAnimation.start("largeCircle");
        await outerCircleAnimation.start(["pulseOut", "pulseIn"], {
          repeat: Infinity,
          repeatType: "mirror",
        });
      } else {
        await outerCircleAnimation.start("circle");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hover]);

  useEffect(() => {
    (async () => {
      if (hover) {
        await innerCircleAnimation.start("square");
        await innerCircleAnimation.start("invisible");
      } else {
        await innerCircleAnimation.start("circle");
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
        initial="circle"
        animate={outerCircleAnimation}
        variants={outerCircleVariants}
        style={{ ...styles.circle, ...styles.outerCircle }}
      />
      <motion.div
        initial="circle"
        animate={innerCircleAnimation}
        variants={innerCircleVariants}
        style={{ ...styles.circle, ...styles.innerCircle }}
      />
    </motion.div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
  },
  circle: {
    position: "absolute",
  },
  outerCircle: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 9999,
  },
  innerCircle: {
    width: "90%",
    height: "90%",
    overflow: "hidden",
    backgroundColor: RED_COLOR,
  },
};

export default RecordButton;
