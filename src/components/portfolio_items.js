import React from "react";
import Card from "./card";

const PortfolioItems = ({ portfolio_items }) => {
  const leftArticlesCount = Math.ceil(portfolio_items.length / 5);
  const leftArticles = portfolio_items.slice(0, leftArticlesCount);
  const rightArticles = portfolio_items.slice(
    leftArticlesCount,
    portfolio_items.length
  );

  return (
    <div>
      <div className="uk-child-width-1-2" data-uk-grid>
        <div>
          {leftArticles.map((portfolio_item, i) => {
            return (
              <Card
                portfolio_item={portfolio_item}
                key={`article__${portfolio_item.id}`}
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
            {rightArticles.map((portfolio_item, i) => {
              return (
                <Card
                  portfolio_item={portfolio_item}
                  key={`article__${portfolio_item.id}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItems;
