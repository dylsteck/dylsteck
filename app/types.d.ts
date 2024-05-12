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