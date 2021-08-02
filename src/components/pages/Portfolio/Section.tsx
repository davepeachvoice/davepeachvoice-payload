import React from 'react';
import { Anchor, Box, Heading } from 'grommet';
import { PortfolioItemInterface } from '../../PortfolioItems/PortfolioItemInterface';
import PortfolioItems from '../../PortfolioItems/PortfolioItems';

interface Props {
  name: string;
  items: PortfolioItemInterface[];
}

export default function Section(props: Props) {
  return (
    <Box id={props.name} pad={{ vertical: 'medium' }} key={props.name}>
      <Box
        direction='row'
        justify='between'
        align='center'
        margin={{ top: 'none', horizontal: 'small' }}
      >
        <Anchor href={`#${props.name}`} color='white'>
          <Heading level={2}>{props.name}</Heading>
        </Anchor>
      </Box>
      <PortfolioItems items={props.items}></PortfolioItems>
    </Box>
  );
}
