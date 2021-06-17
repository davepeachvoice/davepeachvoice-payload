import React from "react";
import { Box, Grid, CardBody, Card } from "grommet";
import PortfolioItem from "./PortfolioItem";
import PortfolioItemInterface from "./PortfolioItemInterface";
import RecordButton from "../components/RecordButton";

interface PortfolioItemsProps {
  items: PortfolioItemInterface[];
}

export default function PortfolioItems(props: PortfolioItemsProps) {
  return (
    <Box pad="large" background="dark-1" height="100%">
      <Grid gap="medium" columns={{ count: "fit", size: "small" }}>
        <RecordButton></RecordButton>
        {props.items.map((item) => (
          <Card
            key={item.title}
            onClick={() => {
              alert("Card was Clicked!");
            }}
          >
            <CardBody pad="small">
              <PortfolioItem portfolioItem={item}></PortfolioItem>
            </CardBody>
            {/* <CardFooter pad={{ horizontal: "medium", vertical: "small" }}>
              <Text size="xsmall">{item.message}</Text>
            </CardFooter> */}
          </Card>
        ))}
      </Grid>
    </Box>
  );
}
