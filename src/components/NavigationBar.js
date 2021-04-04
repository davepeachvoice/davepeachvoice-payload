import React from "react";

import { Grommet, Header, Anchor, Box, ResponsiveContext, Menu } from "grommet";
import { Grommet as GrommetIcon, Menu as MenuIcon } from "grommet-icons";
import { grommet } from "grommet/themes";
import Link from "next/link";

const NavigationBar = () => (
  <Grommet theme={grommet}>
    <Header background="light-4" pad="medium" height="xsmall">
      <Link href="/">
        <Anchor
          icon={<GrommetIcon color="brand" />}
          label="Dave Peach: Professional Voice"
        />
      </Link>
      <ResponsiveContext.Consumer>
        {(size) =>
          size === "small" ? (
            <Box justify="end">
              <Menu
                a11yTitle="Navigation Menu"
                dropProps={{ align: { top: "bottom", right: "right" } }}
                icon={<MenuIcon color="brand" />}
                items={[
                  {
                    label: <Box pad="small">Dave Peach Voice</Box>,
                    href: "https://v2.grommet.io/",
                  },
                  {
                    label: <Box pad="small">Feedback</Box>,
                    href: "https://github.com/grommet/grommet/issues",
                  },
                ]}
              />
            </Box>
          ) : (
            <Box justify="end" direction="row" gap="medium">
              <Link href="/pricing">
                <Anchor href="https://v2.grommet.io/" label="Pricing" />
              </Link>
              <Link href="/contact">
                <Anchor
                  href="https://github.com/grommet/grommet/issues"
                  label="Contact"
                />
              </Link>
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  </Grommet>
);

export default NavigationBar;
