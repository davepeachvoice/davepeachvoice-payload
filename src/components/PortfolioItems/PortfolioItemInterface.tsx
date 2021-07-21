export interface PortfolioItemInterface {
  title: string;
  mediaType: 'audio' | 'video';
  mediaSource: string;
  thumbnailSource: string;
  homepageVisible: true;
  priority: number;
  type: string;
}

export type PortfolioItemDataInterface = Pick<
  PortfolioItemInterface,
  'title' | 'mediaType' | 'mediaSource' | 'thumbnailSource'
>;
