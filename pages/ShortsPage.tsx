
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Video } from '../types';
import { Heart, MessageCircle, Share2, Music, Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';
import { getYouTubeId } from '../utils';

const ShortsPage: React.FC = () => {
  const { videos, incrementViews } = useApp();
  const shorts = videos.filter(v => v.type === '9x16');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const currentVideo = shorts[activeIndex];

  const handleNext = () => {
    if (activeIndex < shorts.length - 1) {
      setActiveIndex(prev => prev + 1);
      incrementViews(shorts[activeIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(prev => prev - 1);
  };

  useEffect(() => {
    if (currentVideo) incrementViews(currentVideo.id);
  }, []);

  if (shorts.length === 0) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold">Nenhum Short encontrado :(</h2>
        <p className="opacity-60 mt-2">Os vídeos verticais aparecerão aqui quando forem cadastrados.</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] bg-black relative flex items-center justify-center overflow-hidden">
      {/* Scroll Controls (Desktop) */}
      <div className="hidden md:flex flex-col gap-4 absolute left-10 z-10">
        <button onClick={handlePrev} disabled={activeIndex === 0} className="p-4 bg-white/10 hover:bg-brand-primary rounded-full text-white disabled:opacity-30">
          <ChevronUp size={32} />
        </button>
        <button onClick={handleNext} disabled={activeIndex === shorts.length - 1} className="p-4 bg-white/10 hover:bg-brand-primary rounded-full text-white disabled:opacity-30">
          <ChevronDown size={32} />
        </button>
      </div>

      {/* Main Container */}
      <div className="relative h-full aspect-[9/16] w-full max-w-[450px] shadow-2xl shadow-brand-primary/20">
        {/* Video Embed */}
        <div className="absolute inset-0 z-0">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${getYouTubeId(currentVideo.youtubeUrl)}?autoplay=1&loop=1&playlist=${getYouTubeId(currentVideo.youtubeUrl)}&controls=0&modestbranding=1&mute=${isPlaying ? 0 : 1}`}
            allow="autoplay; encrypted-media"
          />
          <div className="absolute inset-0 z-1 bg-transparent" onClick={() => setIsPlaying(!isPlaying)}></div>
        </div>

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="bg-black/40 p-6 rounded-full">
              <Pause size={48} className="text-white opacity-80" />
            </div>
          </div>
        )}

        {/* UI Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none">
          {/* Actions */}
          <div className="absolute right-4 bottom-32 flex flex-col gap-6 pointer-events-auto">
            <button className="flex flex-col items-center gap-1 group">
              <div className="bg-white/10 p-3 rounded-full group-hover:bg-red-500 transition-colors">
                <Heart size={28} className="text-white fill-white/20 group-hover:fill-white" />
              </div>
              <span className="text-white text-xs font-bold">12K</span>
            </button>
            <button className="flex flex-col items-center gap-1 group">
              <div className="bg-white/10 p-3 rounded-full group-hover:bg-brand-primary transition-colors">
                <MessageCircle size={28} className="text-white" />
              </div>
              <span className="text-white text-xs font-bold">452</span>
            </button>
            <button className="flex flex-col items-center gap-1 group">
              <div className="bg-white/10 p-3 rounded-full group-hover:bg-brand-accent transition-colors">
                <Share2 size={28} className="text-white" />
              </div>
              <span className="text-white text-xs font-bold">Comp.</span>
            </button>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-primary border-2 border-white flex items-center justify-center font-bold text-white">L</div>
              <span className="text-white font-bold">LuzPlay Oficial</span>
              <button className="bg-white text-black text-xs font-black px-4 py-1.5 rounded-full pointer-events-auto">INSCREVER</button>
            </div>
            <h3 className="text-white text-lg font-medium leading-tight line-clamp-2">
              {currentVideo.title}
            </h3>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Music size={14} className="animate-spin-slow" />
              <span>Som original - LuzPlay Records</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div className="h-full bg-brand-primary w-1/3 animate-[progress_15s_linear_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default ShortsPage;
