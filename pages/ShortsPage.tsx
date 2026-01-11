
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Video } from '../types.ts';
import { Heart, MessageCircle, Share2, Music, Play, Pause, ChevronUp, ChevronDown, AlertCircle } from 'lucide-react';
import { getYouTubeId } from '../utils.ts';

const ShortsPage: React.FC = () => {
  const { videos, incrementViews } = useApp();
  const shorts = videos.filter(v => v.type === '9x16');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const currentVideo = shorts[activeIndex];
  const videoId = currentVideo ? getYouTubeId(currentVideo.youtubeUrl) : null;

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
  }, [activeIndex]);

  if (shorts.length === 0) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center p-4">
        <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
          <Play size={40} className="text-brand-primary opacity-40" />
        </div>
        <h2 className="text-2xl font-black italic uppercase">Nenhum Short encontrado</h2>
        <p className="opacity-60 mt-2 max-w-xs">Vídeos cadastrados como "Vertical (9x16)" aparecerão nesta seção exclusiva.</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] bg-black relative flex items-center justify-center overflow-hidden">
      {/* Scroll Controls (Desktop) */}
      <div className="hidden md:flex flex-col gap-4 absolute left-10 z-10">
        <button 
          onClick={handlePrev} 
          disabled={activeIndex === 0} 
          className="p-4 bg-white/5 hover:bg-brand-primary rounded-full text-white disabled:opacity-10 transition-all hover:scale-110 border border-white/10"
        >
          <ChevronUp size={32} />
        </button>
        <div className="text-center font-black text-xs text-white/40">{activeIndex + 1} / {shorts.length}</div>
        <button 
          onClick={handleNext} 
          disabled={activeIndex === shorts.length - 1} 
          className="p-4 bg-white/5 hover:bg-brand-primary rounded-full text-white disabled:opacity-10 transition-all hover:scale-110 border border-white/10"
        >
          <ChevronDown size={32} />
        </button>
      </div>

      {/* Main Container */}
      <div className="relative h-full aspect-[9/16] w-full max-w-[450px] shadow-2xl shadow-brand-primary/20 bg-slate-900 group">
        {/* Video Embed */}
        <div className="absolute inset-0 z-0">
          {videoId ? (
            <iframe
              key={videoId}
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
              allow="autoplay; encrypted-media"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-slate-900">
              <AlertCircle size={48} className="text-red-500 mb-4" />
              <p className="text-white font-bold">Link de Short Inválido</p>
              <p className="text-white/40 text-xs mt-2">{currentVideo.youtubeUrl}</p>
            </div>
          )}
          <div className="absolute inset-0 z-1 bg-transparent cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}></div>
        </div>

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-full">
              <Play size={64} className="text-white opacity-80 fill-white" />
            </div>
          </div>
        )}

        {/* UI Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none">
          {/* Actions */}
          <div className="absolute right-4 bottom-32 flex flex-col gap-6 pointer-events-auto">
            <button className="flex flex-col items-center gap-1 group/btn">
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-full group-hover/btn:bg-red-500 transition-all group-hover/btn:scale-110">
                <Heart size={28} className="text-white fill-white/20 group-hover/btn:fill-white" />
              </div>
              <span className="text-white text-[10px] font-black uppercase tracking-widest">Gostei</span>
            </button>
            <button className="flex flex-col items-center gap-1 group/btn">
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-full group-hover/btn:bg-brand-primary transition-all group-hover/btn:scale-110">
                <MessageCircle size={28} className="text-white" />
              </div>
              <span className="text-white text-[10px] font-black uppercase tracking-widest">Amém</span>
            </button>
            <button className="flex flex-col items-center gap-1 group/btn">
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-full group-hover/btn:bg-green-500 transition-all group-hover/btn:scale-110">
                <Share2 size={28} className="text-white" />
              </div>
              <span className="text-white text-[10px] font-black uppercase tracking-widest">Enviar</span>
            </button>
          </div>

          {/* Info */}
          <div className="space-y-4 max-w-[80%]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary border-2 border-white/20 flex items-center justify-center font-black text-white text-xl shadow-lg">L</div>
              <div className="flex flex-col">
                <span className="text-white font-black italic tracking-tighter">LuzPlay Oficial</span>
                <span className="text-[10px] text-brand-primary font-black uppercase tracking-[0.2em]">Inspirando sua fé</span>
              </div>
              <button className="ml-2 bg-white text-black text-[10px] font-black px-4 py-2 rounded-xl pointer-events-auto hover:bg-brand-primary hover:text-white transition-colors uppercase tracking-widest">INSCREVER</button>
            </div>
            
            <h3 className="text-white text-xl font-bold leading-tight line-clamp-2 italic tracking-tight">
              {currentVideo.title}
            </h3>
            
            <div className="flex items-center gap-2 text-white/60 text-xs font-medium">
              <Music size={14} className="animate-pulse text-brand-primary" />
              <span className="truncate">Áudio Original • Mensagem de Esperança</span>
            </div>
          </div>
        </div>

        {/* Progress Bar (Simulada) */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 z-20">
          <div className="h-full bg-brand-primary w-0 animate-[progress_15s_linear_infinite]"></div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ShortsPage;
