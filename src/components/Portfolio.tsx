import React from "react";

import PortfolioItems from "./PortfolioItems";
import PortfolioItemInterface from "./PortfolioItemInterface";

export default function Portfolio() {
  const items = [buildPortfolioItem()];
  return <PortfolioItems items={items}></PortfolioItems>;
}

function buildPortfolioItem() {
  const mediaType: PortfolioItemInterface["mediaType"] = "video";
  return {
    title: "hi there",
    mediaType: mediaType,
  };
}
