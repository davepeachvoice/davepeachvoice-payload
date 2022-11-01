import 'server-only';
import { PortfolioItemInterface } from './components/PortfolioItems/PortfolioItemInterface';

export interface PortfolioCategory {
  title: string;
  items: PortfolioItemInterface[];
  priority: number;
}

/**
 * https://medium.com/@shawnstern/importing-multiple-markdown-files-into-a-react-component-with-webpack-7548559fce6f
 * second flag in require.context function is if subdirectories should be searched
 */
export async function importPortfolioItems() {
  const markdownFiles: string[] = require
    .context('content/portfolio_items', false, /\.\/.*\.md$/)
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
        `content/portfolio_items/${path}`
      );
      return { ...markdown };
    })
  );
}

export async function importPortfolioCategories() {
  const markdownFiles: string[] = require
    .context('content/portfolio_categories', false, /\.\/.*\.md$/)
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
        `content/portfolio_categories/${path}`
      );
      return { ...markdown };
    })
  );
}
