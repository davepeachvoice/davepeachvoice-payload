import React from 'react';
import { useViewportScroll, motion, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Layout from '../components/Layout';
import HomeHero from '../components/HomeAudio';

const Parallax = () => {
  const { scrollY } = useViewportScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 200]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0.5,
    triggerOnce: false,
  });

  console.log(entry);

  // const [isInViewport, setIsInViewport] = useState(false);

  //console.log(window.innerHeight);
  //let coso = useRef(null);

  // useEffect(() => {
  //   console.log(coso.current.offsetTop);
  //   if (
  //     coso.current.offsetTop > scrollY &&
  //     coso.current.offsetTop < window.innerHeight
  //   ) {
  //     setIsInViewport(true);
  //   } else {
  //     setIsInViewport(false);
  //   }
  // }, [coso]);
  // useEffect(() => {
  //   scrollY.onChange(v => console.log(v));
  // }, [scrollY]);

  const variants = {
    visible: { opacity: 1, scale: 1, y: 0 },
    hidden: {
      opacity: 0,
      scale: 0.65,
      y: 50,
    },
  };

  return (
    <>
      <style>{`
        body {
          font-family: sans-serif;
          text-align: center;
          height: 300vh;
          background-color: #3b6fe0;
          color: #fff;
          padding-top: 320px;
        }

        .box {
          width: 150px;
          height: 150px;
          border-radius: 1em;
          background-color: #f9f07e;
          margin-left: auto;
          margin-right: auto;
        }

        .magic {
          width: 200px;
          height: 200px;
          background-color: #fff;
          border-radius: 20px;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>

      <Layout>
        <HomeHero></HomeHero>
        <motion.div className='box' style={{ y: y1, x: -50 }} />
        <motion.div
          className='box'
          style={{ y: y2, x: 50, background: 'salmon' }}
        />
        <div style={{ height: 500 }} />
        <div style={{ position: 'fixed', top: 0, left: 0 }}>
          {' '}
          {'is in view? ' + inView}
        </div>
        <motion.div
          animate={inView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 2, ease: 'easeOut' }}
          ref={ref}
          className='magic'
        />
      </Layout>
    </>
  );
};

export default Parallax;
