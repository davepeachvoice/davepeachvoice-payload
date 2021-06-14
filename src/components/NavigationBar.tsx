import React from "react";

import { Header, Anchor, Box, ResponsiveContext, Menu } from "grommet";
import { Menu as MenuIcon } from "grommet-icons";
import Link from "next/link";
import Router from "next/router";

const NavigationBar = () => (
  <Header background="light-4" pad="medium" height="xsmall">
    <Link href="/">
      <Anchor label="Dave Peach: Professional Voice" />
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
                // TODO: make this use an anchor for each that has an href for SEO purposes
                // https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag
                // (note that it might not matter that much because we have real links outside of the mobile experience that are the same)
                {
                  label: <Box pad="small">Pricing</Box>,
                  onClick: () => {
                    Router.push("/pricing");
                  },
                },
                {
                  label: <Box pad="small">Contact</Box>,
                  onClick: () => {
                    Router.push("/contact");
                  },
                },
              ]}
            ></Menu>
          </Box>
        ) : (
          <Box justify="end" direction="row" gap="medium">
            <Link href="/pricing" passHref>
              <Anchor label="Pricing" />
            </Link>
            <Link href="/contact" passHref>
              <Anchor label="Contact" />
            </Link>
          </Box>
        )
      }
    </ResponsiveContext.Consumer>
  </Header>
);

export default NavigationBar;
