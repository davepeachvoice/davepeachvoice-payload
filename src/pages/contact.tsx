import { attributes, react as ContactContent } from "../content/contact.md";

import NavigationBar from "../components/NavigationBar";

import Layout from "../components/Layout";
import HomeHero from "../components/HomeAudio.js";

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grommet, Main, Grid, Box } from "grommet";
import Parallax from "../components/Parallax/Parallax";

const Contact = () => {
  return (
    <Layout>
      <ContactContent></ContactContent>
      <Parallax></Parallax>
    </Layout>
  );
};

export default Contact;
