
import React from 'react';
import { Video } from '../types';
import { Play, Info, Eye, Sparkles } from 'lucide-react';
import { formatViews } from '../utils';

interface HeroProps {
  video: Video;
  onPlay: (v: Video) => void;
}

const Hero: React.FC<HeroProps> = ({ video, onPlay }) => {
  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] flex items-end overflow-hidden">
      {/* Background Image with Gradient */}
      <div className="absolute inset-0">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light dark:from-brand-dark via-transparent to-brand-dark/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 pb-20 md:pb-32">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-white text-brand-dark text-[10px] font-black rounded-full uppercase tracking-[0.2em] shadow-lg flex items-center gap-2">
              <Sparkles size={14} className="text-brand-primary" /> MENSAGEM EM DESTAQUE
            </span>
            <span className="text-white/60 text-xs font-bold border-l border-white/20 pl-3">
              {formatViews(video.views)} vidas tocadas
            </span>
          </div>
          
          <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] drop-shadow-2xl italic tracking-tighter mb-6">
            {video.title}
          </h2>
          
          <p className="text-xl md:text-2xl text-white/70 mt-4 line-clamp-3 drop-shadow font-medium max-w-xl italic">
            "{video.description}"
          </p>

          <div className="flex flex-wrap gap-5 mt-10">
            <button 
              onClick={() => onPlay(video)}
              className="group flex items-center gap-3 bg-brand-primary hover:bg-brand-accent text-white font-black px-10 py-5 rounded-full transition-all hover:scale-105 shadow-2xl shadow-brand-primary/40 text-lg"
            >
              <Play size={28} fill="currentColor" className="group-hover:scale-110 transition-transform" /> OUVIR AGORA
            </button>
            <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold px-10 py-5 rounded-full transition-all">
              <Info size={24} /> CONHECER MAIS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
