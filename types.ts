
export type VideoType = '16x9' | '9x16';

export interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  youtubeUrl: string;
  type: VideoType;
  thumbnail: string;
  views: number;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Ad {
  id: string;
  title: string;
  imageUrl?: string;
  link?: string;
  htmlCode?: string;
  position: 'top' | 'sidebar' | 'footer' | 'pre-roll' | 'post-roll';
  active: boolean;
}

export interface PixSettings {
  key: string;
  qrCodeUrl: string;
  active: boolean;
}

export interface AppState {
  videos: Video[];
  categories: Category[];
  ads: Ad[];
  pixSettings: PixSettings;
  favorites: string[]; // IDs dos vídeos favoritos
  searchTerm: string;
  isDarkMode: boolean;
  isAdmin: boolean;
}
