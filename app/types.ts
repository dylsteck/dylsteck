export type MediaItemType = 'blog' | 'video';

export type TabType = 'all' | MediaItemType;

export type MediaItem = {
  id: string;
  date: string;
  title: string;
  description?: string;
  banner: string;
  type: MediaItemType;
};

export type State = {
  count: number;
};

export type GalleryItem = {
  title: string;
  type: GalleryItemType;
  url: string;
  imageUrl: string;
};

export enum GalleryItemType {
  article = "Article",
  nft = "NFT",
  paper = "Paper",
  product = "Product",
  video = "Video",
}

export type GalleryItems = {
  name: string;
  description: string;
  id: string;
  articleSlug: string;
  items: GalleryItem[]
}