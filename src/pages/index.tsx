import NavigationBar from "../components/NavigationBar";

import Layout from "../components/Layout";
import HomeHero from "../components/HomeHero.js";

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grommet, Main, Grid, Box } from "grommet";

const Index = () => {
  return (
    <Layout>
      <HomeHero></HomeHero>
    </Layout>
  );
};

export default Index;
