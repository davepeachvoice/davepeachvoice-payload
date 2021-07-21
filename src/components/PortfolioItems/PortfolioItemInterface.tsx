export interface PortfolioItemInterface {
  title: string;
  mediaType: 'audio' | 'video';
  mediaSource: string;
  thumbnailSource: string;
  homepageVisible: true;
  priority: number;
  type: 'commercial' | 'sports';
}

export type PortfolioItemDataInterface = Pick<
  PortfolioItemInterface,
  'title' | 'mediaSource' | 'mediaType' | 'thumbnailSource'
>;
