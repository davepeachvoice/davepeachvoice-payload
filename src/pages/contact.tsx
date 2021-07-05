import { react as ContactContent } from '../content/contact.md';

import Layout from '../components/Layout';

import React from 'react';
import Parallax from '../components/Parallax/Parallax';

const Contact = () => {
  return (
    <Layout>
      <ContactContent></ContactContent>
      <Parallax></Parallax>
    </Layout>
  );
};

export default Contact;
