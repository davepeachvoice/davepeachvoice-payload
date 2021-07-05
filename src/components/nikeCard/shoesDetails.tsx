import React from 'react';
import styled from 'styled-components';
import Marginer from './marginer';
import PortfolioItem from '../PortfolioItemInterface';

const DetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2.5em 6px 0 6px;
  line-height: 1.4;
`;

const MediumText = styled.span`
  font-size: 18px;
  color: #fff;
  font-weight: 800;
  text-transform: uppercase;
`;

const SmallText = styled.span`
  font-size: 11px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
`;

const SpacedHorizontalContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButton = styled.button`
  padding: 10px 16px;
  background-color: #fbbe01;
  color: #000;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  border: 3px solid transparent;
  outline: none;
  cursor: pointer;
  transition: all 290ms ease-in-out;
  border-radius: 8px;
  align-self: flex-end;
  &:hover {
    background-color: transparent;
    color: #fff;
    border: 3px solid #fbbe01;
  }
`;

interface PortfolioItemProps {
  portfolioItem: PortfolioItem;
}

export default function ShoesDetails(props: PortfolioItemProps) {
  return (
    <DetailsContainer>
      <SpacedHorizontalContainer>
        <MediumText>{props.portfolioItem.title}</MediumText>
      </SpacedHorizontalContainer>
      <Marginer direction='vertical' margin='1.2em' />
      <SpacedHorizontalContainer>
        <ActionButton>
          {props.portfolioItem.mediaType == 'video' ? 'watch' : 'listen'}
        </ActionButton>
      </SpacedHorizontalContainer>
    </DetailsContainer>
  );
}
