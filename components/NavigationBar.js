import React from 'react';

import { Grommet, Header, Anchor, Box, ResponsiveContext, Menu } from 'grommet';
import { Grommet as GrommetIcon, Menu as MenuIcon } from 'grommet-icons';
import { grommet } from 'grommet/themes';

const NavigationBar = () => (
  <Grommet theme={grommet}>
    <Header background="light-4" pad="medium" height="xsmall">
      <Anchor
        href="https://tools.grommet.io/"
        icon={<GrommetIcon color="brand" />}
        label="Dave Peach: Professional Voice"
      />
      <ResponsiveContext.Consumer>
        {size =>
          size === 'small' ? (
            <Box justify="end">
              <Menu
                a11yTitle="Navigation Menu"
                dropProps={{ align: { top: 'bottom', right: 'right' } }}
                icon={<MenuIcon color="brand" />}
                items={[
                  {
                    label: <Box pad="small">Dave Peach Voice</Box>,
                    href: 'https://v2.grommet.io/',
                  },
                  {
                    label: <Box pad="small">Feedback</Box>,
                    href: 'https://github.com/grommet/grommet/issues',
                  },
                ]}
              />
            </Box>
          ) : (
            <Box justify="end" direction="row" gap="medium">
              <Anchor href="https://v2.grommet.io/" label="Pricing" />
              <Anchor
                href="https://github.com/grommet/grommet/issues"
                label="Contact"
              />
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  </Grommet>
);

export default NavigationBar;
