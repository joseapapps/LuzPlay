
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Hero from '../components/Hero';
import VideoCard from '../components/VideoCard';
import { AdBanner } from '../components/AdSection';
import VideoPlayer from '../components/VideoPlayer';
import { Video } from '../types';
import { ChevronRight, Sparkles, BookOpen, Heart, Copy, Check, SearchX, Share2 } from 'lucide-react';

const VERSES = [
  { text: "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.", ref: "Salmos 119:105" },
  { text: "O Senhor é o meu pastor, nada me faltará.", ref: "Salmos 23:1" },
  { text: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4:13" },
  { text: "Não andeis ansiosos por coisa alguma; antes em tudo sejam os vossos pedidos conhecidos diante de Deus pela oração.", ref: "Filipenses 4:6" },
  { text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.", ref: "João 3:16" }
];

const Home: React.FC = () => {
  const { videos, categories, incrementViews, pixSettings, favorites, searchTerm } = useApp();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [dailyVerse, setDailyVerse] = useState(VERSES[0]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const randomVerse = VERSES[Math.floor(Math.random() * VERSES.length)];
    setDailyVerse(randomVerse);
  }, []);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    incrementViews(video.id);
  };

  const copyPix = () => {
    navigator.clipboard.writeText(pixSettings.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareVerse = () => {
    const text = `📖 *Pão Diário - LuzPlay*\n\n"${dailyVerse.text}"\n\n— _${dailyVerse.ref}_\n\nAssista mensagens que edificam em: ${window.location.origin}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Pão Diário - LuzPlay',
        text: text,
        url: window.location.origin,
      }).catch(() => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
      });
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const favoriteVideos = videos.filter(v => favorites.includes(v.id));
  const featuredVideo = videos.find(v => v.type === '16x9') || videos[0];

  return (
    <div className="pb-20">
      {!searchTerm && featuredVideo && <Hero video={featuredVideo} onPlay={handleVideoClick} />}

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20 space-y-16">
        
        {searchTerm && (
          <div className="pt-24 space-y-8 min-h-[60vh]">
            <div className="flex items-center justify-between border-b border-brand-primary/20 pb-4">
              <h2 className="text-3xl font-black italic">RESULTADOS PARA: <span className="text-brand-primary">"{searchTerm.toUpperCase()}"</span></h2>
              <span className="bg-brand-primary/10 text-brand-primary px-4 py-1 rounded-full text-xs font-bold">{filteredVideos.length} vídeos</span>
            </div>
            
            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVideos.map(v => <VideoCard key={v.id} video={v} onClick={handleVideoClick} />)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                <SearchX size={64} className="mb-4" />
                <p className="text-xl font-bold">Nenhum vídeo encontrado com esse termo.</p>
                <p>Tente palavras como "oração", "reflexão" ou "bíblia".</p>
              </div>
            )}
          </div>
        )}

        {!searchTerm && (
          <>
            <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl border border-brand-primary/30 p-8 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center gap-6 animate-gradient bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-primary/10">
              <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-brand-primary/30">
                <BookOpen size={32} />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-xs font-black tracking-widest text-brand-primary uppercase mb-1">Pão Diário</h4>
                <p className="text-xl md:text-2xl font-serif italic dark:text-slate-100 text-slate-800 leading-relaxed">
                  "{dailyVerse.text}"
                </p>
                <p className="text-sm font-bold text-brand-primary mt-2">— {dailyVerse.ref}</p>
              </div>
              <button 
                onClick={shareVerse}
                className="md:ml-auto bg-brand-primary hover:bg-brand-accent text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 transition-transform hover:scale-105 shadow-xl shadow-brand-primary/20"
              >
                <Share2 size={16} /> COMPARTILHAR
              </button>
            </div>

            <AdBanner position="top" />

            {/* Favoritos (Minha Lista) - ID Adicionado para navegação */}
            {favoriteVideos.length > 0 && (
              <section id="favorites-section" className="space-y-4 scroll-mt-24">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500 rounded-lg text-white"><Heart size={20} fill="currentColor" /></div>
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase">Minha Lista</h3>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4">
                  {favoriteVideos.map(video => (
                    <div key={video.id} className={`flex-shrink-0 ${video.type === '9x16' ? 'w-48 md:w-56' : 'w-72 md:w-80'}`}>
                      <VideoCard video={video} onClick={handleVideoClick} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {categories.map(cat => {
              const catVideos = videos.filter(v => v.category === cat.slug);
              if (catVideos.length === 0) return null;

              return (
                <section key={cat.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black italic border-l-4 border-brand-primary pl-4 tracking-tighter uppercase">
                      {cat.name}
                    </h3>
                  </div>
                  
                  <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4">
                    {catVideos.map(video => (
                      <div key={video.id} className={`flex-shrink-0 ${video.type === '9x16' ? 'w-48 md:w-56' : 'w-72 md:w-80'}`}>
                        <VideoCard video={video} onClick={handleVideoClick} />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

            {pixSettings.active && (
              <section className="bg-slate-50 dark:bg-slate-900 border border-brand-primary/10 p-8 md:p-12 rounded-[3rem] shadow-inner flex flex-col lg:flex-row items-center gap-12">
                <div className="shrink-0 bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 transition-transform hover:scale-105">
                  <img src={pixSettings.qrCodeUrl} alt="QR PIX" className="w-48 h-48 md:w-60 md:h-60 object-contain" />
                  <p className="text-[10px] text-center font-black text-slate-400 mt-4 uppercase tracking-[0.2em]">Contribuição Voluntária</p>
                </div>
                <div className="flex-1 text-center lg:text-left space-y-6">
                  <div className="inline-flex items-center gap-3 text-brand-primary">
                    <Heart size={32} className="fill-current" />
                    <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase leading-none">Ajude a Manter <br/>esta Luz Acesa</h2>
                  </div>
                  <p className="text-lg opacity-70 leading-relaxed font-medium">
                    Somos um ministério independente. Sua oferta ajuda no pagamento dos servidores e na produção de novos conteúdos de fé. Que Deus te abençoe ricamente!
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-xs font-black uppercase tracking-widest opacity-40">Copiar Chave PIX</p>
                    <div className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm">
                      <span className="font-mono font-bold text-brand-primary flex-1 break-all px-4">{pixSettings.key}</span>
                      <button 
                        onClick={copyPix}
                        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-[1.5rem] font-black text-sm transition-all shadow-lg ${copied ? 'bg-green-500 text-white' : 'bg-brand-primary text-white hover:scale-105'}`}
                      >
                        {copied ? <><Check size={18} /> COPIADO!</> : <><Copy size={18} /> COPIAR CHAVE</>}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        <AdBanner position="footer" />
      </div>

      {selectedVideo && (
        <VideoPlayer 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
};

export default Home;
