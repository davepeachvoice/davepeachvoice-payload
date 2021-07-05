import React from "react";
import { Box, Grid, CardBody, Card } from "grommet";
import PortfolioItem from "./PortfolioItem";
import PortfolioItemInterface from "./PortfolioItemInterface";
import RecordButton from "../components/RecordButton";

interface PortfolioItemsProps {
  items: PortfolioItemInterface[];
}

export default function PortfolioItems(props: PortfolioItemsProps) {
  // meaningless comment
  return (
    <Box pad="large" background="dark-1" height="100%">
      <Grid gap="medium" columns={{ count: "fit", size: "small" }}>
        {props.items.map((item) => (
          <RecordButton
            key={item.title}
            item={item}
            onClick={() => {
              alert("Card was Clicked!");
            }}
          ></RecordButton>
        ))}
      </Grid>
    </Box>
  );
}
