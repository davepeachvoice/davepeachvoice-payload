import { react as InquiriesContent } from '@content/inquiries.md';
import InquiryForm from '../components/pages/Inquiries/Form';

import Layout from '../components/Layout';
import { Main, Box, Anchor } from 'grommet';
import Image from 'next/image';
import SocialIcons from '@components/SocialIcons';
import { motion } from 'framer-motion';

import React from 'react';

export default function Inquiries() {
  return (
    <Layout>
      <Main align='center'>
        <Box height='small' width='large' justify='center'>
          <InquiriesContent></InquiriesContent>
        </Box>
        <Box
          width='xlarge'
          direction='row'
          justify='evenly'
          pad='large'
          gap='medium'
        >
          <Box height='500px'>
            <Image
              height='500px'
              width='400px'
              objectFit='contain'
              src='/dave-peach-web-netlify-cms/march_madness.png'
              objectPosition='center top'
            />
          </Box>
          <motion.div
            initial='hidden'
            animate='visible'
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.4,
                },
              },
            }}
          >
            <InquiryForm></InquiryForm>
          </motion.div>
        </Box>
      </Main>
    </Layout>
  );
}
