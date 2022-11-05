import { importPortfolioItems } from '../../src/import-portfolio-data';
import HomeHero from '../components/HomeHero';
import Players from '../components/Media/Players';
import { comparePriorities } from '../lib/compare-priorities';

export default async function Index() {
  const portfolioItemsMarkdownData = await importPortfolioItems();

  const portfolioItems = portfolioItemsMarkdownData.map(
    (portfolioItemMarkdownData) => portfolioItemMarkdownData.attributes
  );

  portfolioItems.sort(comparePriorities);

  return (
    <>
      <HomeHero />
      <Players portfolioItems={portfolioItems} />
    </>
  );
}
