import { ContactForm } from '@components/pages/Services/Form';
import { importServices } from '@components/services/service-data';
import {
  attributes as ServicesAttributes,
  react as ServicesContent,
} from '@content/services.md';
import { motion } from 'framer-motion';
import { Box, Button, Main } from 'grommet';
import type { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import React from 'react';
import { buildBlurDataUrl } from '../common/cloudinary-build-blur-data-url';
import Layout from '../components/Layout';
import { comparePriorities } from '../lib/compare-priorities';

export default function Services(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title='Services'>
      <Main align='center' pad='large'>
        <Box height='small' width='large' justify='center'>
          <ServicesContent></ServicesContent>
        </Box>

        <Box width='large'>
          <motion.div
            style={{
              // allow shrinking on smaller screens
              width: '100%',
            }}
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
            <Box width='100%' alignContent='center'>
              <Box>
                <ContactForm
                  services={props.services}
                  step0Header={ServicesAttributes.step0_header}
                  step1Header={ServicesAttributes.step1_header}
                  attributionFieldPrompt={
                    ServicesAttributes.attribution_field_prompt
                  }
                  attributionFieldOptions={
                    ServicesAttributes.attribution_field_options
                  }
                ></ContactForm>
              </Box>
            </Box>
          </motion.div>
        </Box>
        <Box
          width='xlarge'
          direction='row'
          justify='evenly'
          pad='large'
          gap='medium'
        >
          <Box>
            <div
              style={{
                minHeight: '500px',
                // TODO: try to avoid the need to specify a width
                minWidth: '500px',
                position: 'relative',
              }}
            >
              <Image
                className='next-image'
                layout='fill'
                objectFit='contain'
                src='/dave-peach-web-netlify-cms/march_madness'
                objectPosition='center top'
                alt='Dave Peach announcing at March Madness in 2021'
                placeholder='blur'
                blurDataURL={props.mainImageBlurDataUrl}
              />
            </div>
          </Box>
        </Box>
        <Button
          href='mailto:davepeachvoice@gmail.com'
          label='Email Dave'
          color='brand'
          size='large'
        />
      </Main>
    </Layout>
  );
}

export async function getStaticProps() {
  const servicesMarkdownData = await importServices();

  const services = servicesMarkdownData.map(
    (localServiceMarkdownData) => localServiceMarkdownData.attributes
  );

  services.sort(comparePriorities);

  return {
    props: {
      services,
      mainImageBlurDataUrl: buildBlurDataUrl(
        '/dave-peach-web-netlify-cms/march_madness.png'
      ),
    },
  };
}
