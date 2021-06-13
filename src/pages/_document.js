import React from "react";
import Document, { Head, Main, NextScript, Html } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* This is going to be your global head */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/grommet/1.10.1/grommet.min.css"
          />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/grommet/1.10.1/grommet.min.js"></script>
        </Head>
        <body>
          <Main /> {/* each routed page will go inside here */}
          <NextScript /> {/* You don't have to care about this. */}
        </body>
      </Html>
    );
  }
}
