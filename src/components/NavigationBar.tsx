import { Anchor, Box, Header, Menu, ResponsiveContext } from 'grommet';
import { Menu as MenuIcon } from 'grommet-icons';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';

const NavigationBar = () => (
  <Header
    background='black'
    pad='medium'
    height='xsmall'
    style={{
      padding: '12px 24px',
      height: '96px',
    }}
  >
    <Link href='/'>
      <Anchor
        style={{
          fontFamily: 'Orbitron',
          fontSize: '24px',
          fontWeight: 'normal',
        }}
      >
        Dave Peach:
        <br />
        Professional Voice
      </Anchor>
    </Link>
    <ResponsiveContext.Consumer>
      {(size) =>
        size === 'small' ? (
          <Box justify='end'>
            <Menu
              a11yTitle='Navigation Menu'
              dropProps={{ align: { top: 'bottom', right: 'right' } }}
              icon={<MenuIcon />}
              dropBackground='#252529'
              items={[
                // TODO: make this use an anchor for each that has an href for SEO purposes
                // https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag
                // (note that it might not matter that much because we have real links outside of the mobile experience that are the same)
                {
                  label: <Box pad='small'>Portfolio</Box>,
                  onClick: () => {
                    Router.push('/portfolio');
                  },
                },
                {
                  label: <Box pad='small'>Services</Box>,
                  onClick: () => {
                    Router.push('/services');
                  },
                },
              ]}
            ></Menu>
          </Box>
        ) : (
          <Box justify='end' direction='row' gap='medium'>
            <Link href='/portfolio' passHref>
              <Anchor label='Portfolio' />
            </Link>
            <Link href='/services' passHref>
              <Anchor label='Services' />
            </Link>
          </Box>
        )
      }
    </ResponsiveContext.Consumer>
  </Header>
);

export default NavigationBar;
