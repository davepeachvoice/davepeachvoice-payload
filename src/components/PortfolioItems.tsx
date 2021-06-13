import React from "react";
import Card from "./card";

interface PortfolioItemsProps {
  portfolioItems: any[];
}

export default function PortfolioItems(props: PortfolioItemsProps) {
  const leftArticlesCount = Math.ceil(props.portfolioItems.length / 5);
  const leftArticles = props.portfolioItems.slice(0, leftArticlesCount);
  const rightArticles = props.portfolioItems.slice(
    leftArticlesCount,
    props.portfolioItems.length
  );

  return (
    <div>
      <div className="uk-child-width-1-2" data-uk-grid>
        <div>
          {leftArticles.map((portfolioItem) => {
            return (
              <Card
                portfolio_item={portfolioItem}
                key={`article__${portfolioItem.id}`}
              />
            );
          })}
        </div>
        <div>
          <div
            className="uk-child-width-1-2@m uk-grid-
          "
            data-uk-grid
          >
            {rightArticles.map((portfolioItem2) => {
              return (
                <Card
                  portfolio_item={portfolioItem2}
                  key={`article__${portfolioItem2.id}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
