import { react as InquiriesContent } from '@content/inquiries.md';
import ContactForm from '../components/pages/Contact/Form';

import Layout from '../components/Layout';
import { Main, Box } from 'grommet';

import React from 'react';

const Contact = () => {
  return (
    <Layout>
      <Main align='center'>
        <Box height='small' width='large' justify='center'>
          <InquiriesContent></InquiriesContent>
        </Box>
        <ContactForm></ContactForm>
      </Main>
    </Layout>
  );
};

export default Contact;
