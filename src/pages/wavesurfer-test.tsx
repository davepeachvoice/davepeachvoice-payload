import React from 'react';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
const Waveform = dynamic(
  () => import('../components/WaveformPlayer/Waveform'),
  { ssr: false }
);

export default function Index() {
  return (
    <Layout>
      <Waveform></Waveform>
    </Layout>
  );
}
