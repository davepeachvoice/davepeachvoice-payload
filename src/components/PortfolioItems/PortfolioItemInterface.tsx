export interface PortfolioItemInterface {
  title: string;
  media_type: 'audio' | 'video';
  media_source: string;
  thumbnail_source: string;
  homepage_visible: true;
  priority: number;
  type: string;
  category: string;
}

export type PortfolioItemDataInterface = Pick<
  PortfolioItemInterface,
  'title' | 'media_type' | 'media_source' | 'thumbnail_source'
>;
