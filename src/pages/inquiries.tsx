import { react as InquiriesContent } from '@content/inquiries.md';
import InquiryForm from '../components/pages/Inquiries/Form';

import Layout from '../components/Layout';
import { Main, Box, Anchor } from 'grommet';
import Image from 'next/image';
import { Twitter, Facebook, Linkedin } from 'grommet-icons';
import { motion } from 'framer-motion';

import React from 'react';

export default function Inquiries() {
  return (
    <Layout>
      <Main align='center'>
        <Box height='small' width='large' justify='center'>
          <InquiriesContent></InquiriesContent>
        </Box>
        <Box fill='horizontal' direction='row' justify='around' pad='large'>
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
        {/* TODO: duplicate less code for social icons */}
        <Box direction='row'>
          <Anchor href='https://twitter.com/davepeach101' target='_blank'>
            <Box
              pad='small'
              round='full'
              align='center'
              hoverIndicator={{
                background: { color: '#111130' },
              }}
              onClick={() => {}}
              focusIndicator={false}
            >
              <Twitter size='medium' />
            </Box>
          </Anchor>
          <Anchor
            href='https://www.facebook.com/profile.php?id=100008652019445'
            target='_blank'
          >
            <Box
              pad='small'
              round='full'
              align='center'
              hoverIndicator={{
                background: { color: '#111130' },
              }}
              onClick={() => {}}
              focusIndicator={false}
            >
              <Facebook size='medium' />
            </Box>
          </Anchor>
          <Anchor
            href='https://www.linkedin.com/in/dave-peach-b05a347'
            target='_blank'
          >
            <Box
              pad='small'
              round='full'
              align='center'
              hoverIndicator={{
                background: { color: '#111130' },
              }}
              onClick={() => {}}
              focusIndicator={false}
            >
              <Linkedin size='medium' />
            </Box>
          </Anchor>
        </Box>
      </Main>
    </Layout>
  );
}
