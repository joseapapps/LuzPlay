
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Video, Category, Ad, AppState, PixSettings } from '../types';
import { INITIAL_VIDEOS, INITIAL_CATEGORIES, INITIAL_ADS } from '../constants';

interface AppContextType extends AppState {
  setDarkMode: (val: boolean) => void;
  setAdmin: (val: boolean) => void;
  setSearchTerm: (term: string) => void;
  addVideo: (video: Video) => void;
  deleteVideo: (id: string) => void;
  updateVideo: (id: string, video: Partial<Video>) => void;
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addAd: (ad: Ad) => void;
  deleteAd: (id: string) => void;
  toggleAd: (id: string) => void;
  incrementViews: (id: string) => void;
  updatePixSettings: (settings: PixSettings) => void;
}

const DEFAULT_PIX: PixSettings = {
  key: 'suachavepix@aqui.com',
  qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ExemploPix',
  active: true
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem('luzplay_videos');
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('luzplay_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [searchTerm, setSearchTerm] = useState('');
  
  const [ads, setAds] = useState<Ad[]>(() => {
    const saved = localStorage.getItem('luzplay_ads');
    return saved ? JSON.parse(saved) : INITIAL_ADS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('luzplay_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [pixSettings, setPixSettings] = useState<PixSettings>(() => {
    const saved = localStorage.getItem('luzplay_pix');
    return saved ? JSON.parse(saved) : DEFAULT_PIX;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('luzplay_dark_mode');
    return saved ? JSON.parse(saved) : true;
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('luzplay_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('luzplay_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('luzplay_ads', JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    localStorage.setItem('luzplay_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('luzplay_pix', JSON.stringify(pixSettings));
  }, [pixSettings]);

  useEffect(() => {
    localStorage.setItem('luzplay_dark_mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addVideo = (v: Video) => setVideos([v, ...videos]);
  const deleteVideo = (id: string) => setVideos(videos.filter(v => v.id !== id));
  const updateVideo = (id: string, updated: Partial<Video>) => 
    setVideos(videos.map(v => v.id === id ? { ...v, ...updated } : v));
  
  const addCategory = (c: Category) => setCategories([...categories, c]);
  const deleteCategory = (id: string) => {
    if (categories.length <= 1) {
      alert("Você deve manter pelo menos uma categoria.");
      return;
    }
    setCategories(categories.filter(c => c.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };
  
  const addAd = (ad: Ad) => setAds([ad, ...ads]);
  const deleteAd = (id: string) => setAds(ads.filter(a => a.id !== id));
  const toggleAd = (id: string) => 
    setAds(ads.map(ad => ad.id === id ? { ...ad, active: !ad.active } : ad));

  const incrementViews = (id: string) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, views: v.views + 1 } : v));
  };

  const updatePixSettings = (settings: PixSettings) => {
    setPixSettings(settings);
  };

  return (
    <AppContext.Provider value={{ 
      videos, categories, ads, pixSettings, favorites, searchTerm, isDarkMode, isAdmin, 
      setDarkMode: setIsDarkMode, 
      setAdmin: setIsAdmin,
      setSearchTerm,
      addVideo, deleteVideo, updateVideo,
      addCategory, deleteCategory,
      toggleFavorite,
      addAd, deleteAd, toggleAd, incrementViews, updatePixSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
