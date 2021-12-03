import { ContactForm } from '@components/pages/Services/Form';
import { importServices } from '@components/services/service-data';
import { ServiceInterface } from '@components/services/ServiceInterface';
import {
  attributes as ServicesAttributes,
  react as ServicesContent,
} from '@content/services.md';
import { motion } from 'framer-motion';
import { Box, Button, Main } from 'grommet';
import Image from 'next/image';
import React from 'react';
import Layout from '../components/Layout';

export default function Services() {
  const [services, setServices] = React.useState<ServiceInterface[]>([]);

  React.useEffect(() => {
    async function setInitialProps() {
      const servicesMarkdownData = await importServices();

      const localServices = servicesMarkdownData.map(
        (localServiceMarkdownData) => localServiceMarkdownData.attributes
      );

      setServices(localServices);
    }

    setInitialProps();
  }, []);

  return (
    <Layout>
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
                  services={services}
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
          <Box height='500px'>
            <Image
              height='500px'
              width='400px'
              objectFit='contain'
              src='/dave-peach-web-netlify-cms/march_madness.png'
              objectPosition='center top'
            />
          </Box>
        </Box>
        <Button
          href='mailto:inquiries@davepeachvoice.com'
          label='Email Dave'
          color='brand'
          size='large'
        />
      </Main>
    </Layout>
  );
}
