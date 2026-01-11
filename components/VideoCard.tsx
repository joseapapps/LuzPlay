
import React from 'react';
import { Video } from '../types';
import { Play, Eye, Heart, Share2 } from 'lucide-react';
import { formatViews } from '../utils';
import { useApp } from '../context/AppContext';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
  layout?: 'horizontal' | 'vertical';
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const { toggleFavorite, favorites } = useApp();
  const isVertical = video.type === '9x16';
  const isFavorite = favorites.includes(video.id);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `📖 *Assista na LuzPlay:* ${video.title}\n\n${video.description}\n\nLink: ${window.location.origin}`;
    
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: text,
        url: window.location.origin,
      }).catch(() => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
      });
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(video.id);
  };

  return (
    <div 
      onClick={() => onClick(video)}
      className={`group cursor-pointer relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.03] hover:z-10 shadow-lg hover:shadow-brand-primary/40
        ${isVertical ? 'aspect-[9/16] w-full' : 'aspect-video w-full'}
      `}
    >
      {/* Thumbnail */}
      <img 
        src={video.thumbnail} 
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay Gradient - Z-10 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity z-10"></div>

      {/* Top Actions - Aumentado Z-index para 30 para garantir clique */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 z-30">
        <button 
          onClick={handleFavorite}
          title="Adicionar à minha lista"
          className={`p-3 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110 ${isFavorite ? 'bg-brand-primary text-white' : 'bg-black/40 text-white hover:bg-white hover:text-brand-primary'}`}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <button 
          onClick={handleShare}
          title="Compartilhar"
          className="p-3 rounded-full bg-green-500/80 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-110 hover:bg-green-500"
        >
          <Share2 size={18} />
        </button>
      </div>

      {/* Content - Ajustado Z-index para 20 */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-brand-primary/90 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
              {video.category}
            </span>
            <span className="flex items-center gap-1 text-white/70 text-[10px] font-bold">
              <Eye size={10} /> {formatViews(video.views)}
            </span>
          </div>
          <h3 className="text-white font-black leading-tight line-clamp-2 text-lg italic tracking-tighter mb-1">
            {video.title}
          </h3>
          
          <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-white/60 text-[11px] line-clamp-2 mb-4 italic">
              {video.description}
            </p>
            <button className="w-full bg-white text-brand-dark font-black py-3 rounded-2xl flex items-center justify-center gap-2 text-xs hover:bg-brand-primary hover:text-white transition-all">
              <Play size={14} fill="currentColor" /> ASSISTIR AGORA
            </button>
          </div>
        </div>
      </div>

      {/* Vertical Badge - Z-20 */}
      {isVertical && (
        <div className="absolute top-4 left-4 bg-brand-primary px-3 py-1 rounded-full text-[9px] text-white font-black tracking-widest uppercase z-20">
          Short
        </div>
      )}
    </div>
  );
};

export default VideoCard;
