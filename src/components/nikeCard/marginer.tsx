import React from 'react';
import styled from 'styled-components';

// https://github.com/ipenywis/react-3d-card/tree/master/src/components/marginer

const HorizontalMargin = styled.span`
  display: flex;
  width: ${({ margin }) =>
    typeof margin === 'string' ? margin : `${margin}px`};
`;

const VerticalMargin = styled.span`
  display: flex;
  height: ${({ margin }) =>
    typeof margin === 'string' ? margin : `${margin}px`};
`;

interface MarginerProps {
  direction?: string;
  margin?: string;
}

export default function Marginer(props: MarginerProps) {
  if (props.direction === undefined) {
    props.direction = 'horizontal';
  }

  if (props.direction === 'horizontal') return <HorizontalMargin {...props} />;
  else {
    return <VerticalMargin {...props} />;
  }
}
