
import React, { useState, useEffect } from 'react';
import { Video } from '../types';
import { getYouTubeId } from '../utils.ts';
import { X, Volume2, VolumeX, SkipForward, AlertTriangle, ExternalLink } from 'lucide-react';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
  preRoll?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose, preRoll = true }) => {
  const [adStep, setAdStep] = useState<'pre' | 'video' | 'post'>(preRoll ? 'pre' : 'video');
  const [countdown, setCountdown] = useState(5);
  const videoId = getYouTubeId(video.youtubeUrl);

  useEffect(() => {
    let timer: any;
    if (adStep === 'pre') {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [adStep]);

  const skipAd = () => {
    if (countdown === 0) setAdStep('video');
  };

  const isVertical = video.type === '9x16';

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-[110] p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
      >
        <X size={24} />
      </button>

      <div className={`relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-2xl bg-black
        ${isVertical ? 'max-w-[400px] aspect-[9/16]' : 'aspect-video'}
      `}>
        {adStep === 'pre' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white bg-gradient-to-br from-indigo-900 to-black">
            <div className="relative w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=1280" 
                alt="Ad" 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-3xl font-black mb-2 italic">PATROCÍNIO EXCLUSIVO</h2>
                <p className="text-xl mb-8 opacity-80">Fortaleça este ministério sendo um apoiador.</p>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <p className="text-sm font-medium mb-4">O vídeo começará em instantes...</p>
                  <button 
                    disabled={countdown > 0}
                    onClick={skipAd}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all
                      ${countdown > 0 ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-brand-primary text-white hover:scale-105 shadow-lg shadow-brand-primary/30'}
                    `}
                  >
                    {countdown > 0 ? `Pular em ${countdown}s` : <><SkipForward size={18} /> Pular Anúncio</>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {adStep === 'video' && (
          videoId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 bg-slate-900">
              <AlertTriangle size={64} className="text-amber-500 mb-6" />
              <h2 className="text-2xl font-black text-white mb-2 uppercase italic">Link de Vídeo Inválido</h2>
              <p className="text-slate-400 max-w-md mb-8">Não conseguimos processar o link do YouTube fornecido. Verifique se a URL está correta no painel administrativo.</p>
              <div className="flex gap-4">
                <button onClick={onClose} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all">VOLTAR</button>
                <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-3 bg-brand-primary text-white rounded-xl font-bold hover:scale-105 transition-all">
                  VER NO YOUTUBE <ExternalLink size={16} />
                </a>
              </div>
            </div>
          )
        )}

        {adStep === 'post' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white bg-slate-900">
            <h2 className="text-2xl font-bold mb-4">Gostou desse conteúdo?</h2>
            <div className="flex gap-4">
              <button 
                onClick={() => setAdStep('video')}
                className="px-6 py-2 bg-brand-primary rounded-full font-bold"
              >
                Assistir Novamente
              </button>
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-white/10 rounded-full font-bold"
              >
                Ver Próximo
              </button>
            </div>
          </div>
        )}
      </div>

      {!isVertical && adStep === 'video' && videoId && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 hidden lg:block animate-in slide-in-from-bottom duration-500">
          <div className="bg-black/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-black text-white italic tracking-tighter">{video.title}</h1>
                <p className="text-white/60 text-sm mt-2 max-w-3xl line-clamp-2">{video.description}</p>
              </div>
              <div className="bg-brand-primary/20 text-brand-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-brand-primary/30">
                {video.category}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
