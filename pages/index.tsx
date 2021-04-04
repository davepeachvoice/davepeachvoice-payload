import NavigationBar from '../components/NavigationBar'

import Layout from '../components/Layout'
import HomeHero from '../components/HomeHero.js'

import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grommet, Main, Grid, Box } from 'grommet'

const Index = () => {
  return (
    <Layout>
      <Main fill width={{ max: 'xlarge' }} align="center" alignSelf="center" alignContent="center" pad="large">
        <HomeHero></HomeHero>
      </Main>
    </Layout>
  )
}

export default Index
