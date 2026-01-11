
import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const AdBanner: React.FC<{ position: 'top' | 'sidebar' | 'footer' }> = ({ position }) => {
  const { ads } = useApp();
  const ad = ads.find(a => a.position === position && a.active);
  const scriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ad?.htmlCode && scriptRef.current) {
      // Forçar a execução de scripts embutidos se houver
      const range = document.createRange();
      range.selectNode(scriptRef.current);
      const documentFragment = range.createContextualFragment(ad.htmlCode);
      scriptRef.current.innerHTML = '';
      scriptRef.current.appendChild(documentFragment);
    }
  }, [ad]);

  if (!ad) return null;

  const containerClasses = {
    top: "w-full flex justify-center py-4 px-4",
    sidebar: "w-full mb-6",
    footer: "w-full flex justify-center py-8 border-t border-slate-200 dark:border-slate-800"
  };

  return (
    <div className={containerClasses[position]}>
      <div className="relative group overflow-hidden max-w-7xl w-full flex justify-center">
        <span className="absolute top-0 left-0 bg-black/40 text-white text-[9px] px-1.5 rounded-br font-bold z-10">Anúncio</span>
        
        {ad.htmlCode ? (
          <div 
            ref={scriptRef} 
            className="w-full flex justify-center overflow-hidden min-h-[90px]"
          />
        ) : (
          <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block w-full">
            <img 
              src={ad.imageUrl} 
              alt={ad.title} 
              className="w-full h-auto rounded-xl shadow-sm hover:shadow-md transition-shadow" 
            />
          </a>
        )}
      </div>
    </div>
  );
};
