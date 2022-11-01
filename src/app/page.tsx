import { importPortfolioItems } from '../../src/import-portfolio-data';
import { buildBlurDataUrl } from '../common/cloudinary-build-blur-data-url';
import HomeHero from '../components/HomeHero';
import Players from '../components/Media/Players';
import { comparePriorities } from '../lib/compare-priorities';

export default async function Index() {
  const portfolioItemsMarkdownData = await importPortfolioItems();

  const portfolioItems = portfolioItemsMarkdownData.map(
    (portfolioItemMarkdownData) => portfolioItemMarkdownData.attributes
  );

  portfolioItems.sort(comparePriorities);

  const heroImageBlurDataUrl = buildBlurDataUrl(
    '/dave-peach-web-netlify-cms/march_madness.png'
  );

  return (
    <>
      <HomeHero imageBlurDataUrl={heroImageBlurDataUrl}></HomeHero>
      <Players portfolioItems={portfolioItems} />
    </>
  );
}
