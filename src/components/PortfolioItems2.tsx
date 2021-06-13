import React from "react";
import { Box, Grid, CardBody, CardFooter, Text, Card } from "grommet";
import PortfolioItem from "./PortfolioItem";

interface PortfolioItemsProps {
  items: any[];
}

export default function PortfolioItems(props: PortfolioItemsProps) {
  return (
    <Box pad="large" background="dark-1" height="100%">
      <Grid gap="medium" columns={{ count: "fit", size: "small" }}>
        {props.items.map((value) => (
          <Card
            key={value.title}
            onClick={() => {
              alert("Card was Clicked!");
            }}
          >
            <CardBody pad="small">
              <PortfolioItem></PortfolioItem>
            </CardBody>
            <CardFooter pad={{ horizontal: "medium", vertical: "small" }}>
              <Text size="xsmall">{value.message}</Text>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}
