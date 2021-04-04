import Layout from "../components/Layout";
import HomeAudio from "../components/HomeAudio.js";
import HomeHero from "../components/HomeHero.js";

import React from "react";
import { react as HomeContent } from "../content/home.md";

const Index = () => {
  return (
    <Layout>
      <HomeHero></HomeHero>
      <HomeAudio></HomeAudio>
      <HomeContent></HomeContent>
    </Layout>
  );
};

export default Index;
