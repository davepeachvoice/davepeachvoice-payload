import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PortfolioSection from '../components/pages/Portfolio/Section';
import { PortfolioItemInterface } from '@components/PortfolioItems/PortfolioItemInterface';

interface PortfolioCategory {
  title: string;
  items: PortfolioItemInterface[];
  priority: number;
}

export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState<
    [string, Pick<PortfolioCategory, 'priority' | 'items'>][]
  >([]);

  /**
   * https://medium.com/@shawnstern/importing-multiple-markdown-files-into-a-react-component-with-webpack-7548559fce6f
   * second flag in require.context function is if subdirectories should be searched
   */
  const importPortfolioItems = async () => {
    const markdownFiles: string[] = require
      .context('../../content/portfolio_items', false, /\.\/.*\.md$/)
      .keys()
      .map((relativePath) => relativePath.substring(2));

    type PortfolioItemsMarkdownData = {
      default: {
        attributes: PortfolioItemInterface;
      };
      attributes: PortfolioItemInterface;
    };

    return Promise.all(
      markdownFiles.map(async (path) => {
        const markdown: PortfolioItemsMarkdownData = await import(
          `../../content/portfolio_items/${path}`
        );
        return { ...markdown };
      })
    );
  };

  const importPortfolioCategories = async () => {
    const markdownFiles: string[] = require
      .context('../../content/portfolio_categories', false, /\.\/.*\.md$/)
      .keys()
      .map((relativePath) => relativePath.substring(2));

    type PortfolioCategoriesMarkdownData = {
      default: {
        attributes: PortfolioCategory;
      };
      attributes: PortfolioCategory;
    };

    return Promise.all(
      markdownFiles.map(async (path) => {
        const markdown: PortfolioCategoriesMarkdownData = await import(
          `../../content/portfolio_categories/${path}`
        );
        return { ...markdown };
      })
    );
  };

  useEffect(() => {
    async function setInitialProps() {
      const portfolioItemsMarkdownData = await importPortfolioItems();

      const portfolioItems = portfolioItemsMarkdownData.map(
        (portfolioItemMarkdownData) => portfolioItemMarkdownData.attributes
      );

      const portfolioItemsCategoriesMarkdownData = await importPortfolioCategories();

      const portfolioCategories = portfolioItemsCategoriesMarkdownData.map(
        (portfolioItemMarkdownData) => portfolioItemMarkdownData.attributes
      );

      // group portfolio items into their categories and sort them by priority
      const portfolioData = buildPortfolioCategories(
        portfolioItems,
        portfolioCategories
      );

      setPortfolioData(portfolioData);
    }
    setInitialProps();
  }, []);

  function buildPortfolioCategories(
    portfolioItems: PortfolioItemInterface[],
    portfolioCategories: PortfolioCategory[]
  ) {
    // also accept categories and build categories const from those categories
    const categories: Record<
      string,
      Pick<PortfolioCategory, 'priority' | 'items'>
    > = {};

    // build categories
    for (const portfolioCategory of portfolioCategories) {
      categories[portfolioCategory.title] = {
        priority: portfolioCategory.priority,
        items: [],
      };
    }

    // populate categories with matching items
    for (const portfolioItem of portfolioItems) {
      categories[portfolioItem.category].items.push(portfolioItem);
    }

    // sort portfolio items within each category
    for (const category in categories) {
      categories[category].items = categories[category].items.sort(
        (firstEl, secondEl) => {
          if (firstEl.priority < secondEl.priority) {
            return -1;
          } else if (firstEl.priority > secondEl.priority) {
            return 1;
          }
          return 0;
        }
      );
    }

    // sort categories by category priority
    const categoriesArray = Object.entries(categories);
    const sortedCategoriesArray = categoriesArray.sort((firstEl, secondEl) => {
      const firstElCategoryData = firstEl[1];
      const secondElCategoryData = secondEl[1];
      if (firstElCategoryData.priority < secondElCategoryData.priority) {
        return -1;
      } else if (firstElCategoryData.priority > secondElCategoryData.priority) {
        return 1;
      }
      return 0;
    });

    // must return array rather than object keyed by category names because the order of the elements matters
    return sortedCategoriesArray;
  }

  return (
    <Layout>
      {portfolioData.map((portfolioCategory) => (
        <PortfolioSection
          key={portfolioCategory[0]}
          name={portfolioCategory[0]}
          items={portfolioCategory[1].items}
        ></PortfolioSection>
      ))}
    </Layout>
  );
}
