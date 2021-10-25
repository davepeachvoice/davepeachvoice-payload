import React from 'react';

import { Header, Anchor, Box, ResponsiveContext, Menu } from 'grommet';
import { Menu as MenuIcon } from 'grommet-icons';
import Link from 'next/link';
import Router from 'next/router';

//        ***********
//     ***          ****
//    **               **
//   ***********         *
//  *           *        ****
//  *           *        *   *
//   ***********         *   *
//    *                  *   *
//    *                  *   *
//    *                  *   *
//    *      ******      ****
//    *     *      *     *
//    *     *      *     *
//      ****         ****

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
                  label: <Box pad='small'>Inquiries</Box>,
                  onClick: () => {
                    Router.push('/inquiries');
                  },
                },
              ]}
            ></Menu>
          </Box>
        ) : (
          <Box justify='end' direction='row' gap='medium'>
            <Link href='/inquiries' passHref>
              <Anchor label='Inquiries' />
            </Link>
          </Box>
        )
      }
    </ResponsiveContext.Consumer>
  </Header>
);

export default NavigationBar;
