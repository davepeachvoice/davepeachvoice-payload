import React from "react";

import PortfolioItems from "./PortfolioItems";
import PortfolioItemInterface from "./PortfolioItemInterface";

export default function Portfolio() {
  const items = [buildPortfolioItem(1), buildPortfolioItem(2)];
  return <PortfolioItems items={items}></PortfolioItems>;
}

function buildPortfolioItem(index) {
  const mediaType: PortfolioItemInterface["mediaType"] = "video";
  return {
    title: `hi there ${index}`,
    mediaType: mediaType,
  };
}
