import Layout from "../components/Layout";
import HomeAudio from "../components/HomeAudio.js";
import HomeHero from "../components/HomeHero.js";

import React from "react";
import HomeExperience from "../components/HomeExperience";

const Index = () => {
  return (
    <Layout>
      <HomeHero></HomeHero>
      <HomeAudio></HomeAudio>
      <HomeExperience></HomeExperience>
    </Layout>
  );
};

export default Index;
