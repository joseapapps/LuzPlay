
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Video, Category, Ad, VideoType, PixSettings } from '../types';
import { 
  Plus, Trash2, Edit2, LayoutGrid, Video as VideoIcon, 
  Settings, BarChart3, Image as ImageIcon, Link as LinkIcon,
  Tag, Type, CheckCircle2, XCircle, Heart, Save, Code, AlertCircle, LogOut,
  Megaphone
} from 'lucide-react';
import { formatViews } from '../utils';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { videos, categories, ads, pixSettings, addVideo, deleteVideo, addAd, deleteAd, toggleAd, updatePixSettings, setAdmin, addCategory, deleteCategory } = useApp();
  const [activeTab, setActiveTab] = useState<'videos' | 'categories' | 'ads' | 'settings'>('videos');
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showAddAdModal, setShowAddAdModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  // Form states
  const [newVideo, setNewVideo] = useState<Partial<Video>>({
    type: '16x9',
    category: categories[0]?.slug || 'reflexoes'
  });

  const [newAd, setNewAd] = useState<Partial<Ad>>({
    position: 'top',
    active: true,
    title: ''
  });

  const [newCat, setNewCat] = useState({ name: '', slug: '' });
  const [editPix, setEditPix] = useState<PixSettings>(pixSettings);

  const handleLogout = () => {
    setAdmin(false);
    onLogout();
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.title || !newVideo.youtubeUrl) return;

    const video: Video = {
      id: Date.now().toString(),
      title: newVideo.title || '',
      description: newVideo.description || '',
      category: newVideo.category || categories[0]?.slug || 'reflexoes',
      youtubeUrl: newVideo.youtubeUrl || '',
      type: newVideo.type as VideoType,
      thumbnail: newVideo.thumbnail || `https://picsum.photos/seed/${Date.now()}/1280/720`,
      views: 0,
      createdAt: Date.now()
    };

    addVideo(video);
    setShowAddVideoModal(false);
    setNewVideo({ type: '16x9', category: categories[0]?.slug });
  };

  const handleAddAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAd.title) return;

    const ad: Ad = {
      id: Date.now().toString(),
      title: newAd.title,
      imageUrl: newAd.imageUrl,
      link: newAd.link,
      htmlCode: newAd.htmlCode,
      position: newAd.position as any,
      active: true
    };

    addAd(ad);
    setShowAddAdModal(false);
    setNewAd({ position: 'top', active: true, title: '' });
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name || !newCat.slug) return;
    
    addCategory({
      id: Date.now().toString(),
      name: newCat.name,
      slug: newCat.slug.toLowerCase().replace(/\s+/g, '-')
    });
    
    setNewCat({ name: '', slug: '' });
    setShowAddCategoryModal(false);
  };

  const handleSavePix = (e: React.FormEvent) => {
    e.preventDefault();
    updatePixSettings(editPix);
    alert('Configurações de PIX salvas com sucesso!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black italic">PAINEL ADMINISTRATIVO</h1>
          <p className="opacity-60">Bem-vindo de volta! Gerencie seu ministério LuzPlay.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setShowAddVideoModal(true)}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-accent text-white font-bold px-5 py-3 rounded-2xl shadow-lg transition-transform hover:scale-105 text-sm"
          >
            <Plus size={18} /> NOVO VÍDEO
          </button>
          <button 
            onClick={() => setShowAddCategoryModal(true)}
            className="flex items-center gap-2 bg-brand-secondary hover:bg-blue-600 text-white font-bold px-5 py-3 rounded-2xl shadow-lg transition-transform hover:scale-105 text-sm"
          >
            <LayoutGrid size={18} /> NOVA CATEGORIA
          </button>
          <button 
            onClick={() => setShowAddAdModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-2xl shadow-lg transition-transform hover:scale-105 text-sm"
          >
            <Megaphone size={18} /> NOVO ANÚNCIO
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-bold px-5 py-3 rounded-2xl transition-all border border-red-500/20 text-sm"
          >
            <LogOut size={18} /> SAIR
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-colors shrink-0 ${activeTab === 'videos' ? 'border-brand-primary text-brand-primary' : 'border-transparent opacity-60'}`}
        >
          <VideoIcon size={20} /> VÍDEOS ({videos.length})
        </button>
        <button 
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-colors shrink-0 ${activeTab === 'categories' ? 'border-brand-primary text-brand-primary' : 'border-transparent opacity-60'}`}
        >
          <LayoutGrid size={20} /> CATEGORIAS ({categories.length})
        </button>
        <button 
          onClick={() => setActiveTab('ads')}
          className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-colors shrink-0 ${activeTab === 'ads' ? 'border-brand-primary text-brand-primary' : 'border-transparent opacity-60'}`}
        >
          <Megaphone size={20} /> ANÚNCIOS ({ads.length})
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-colors shrink-0 ${activeTab === 'settings' ? 'border-brand-primary text-brand-primary' : 'border-transparent opacity-60'}`}
        >
          <Heart size={20} /> DOAÇÕES PIX
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6">
        {activeTab === 'videos' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="p-4 font-bold text-xs uppercase opacity-60">Miniatura</th>
                  <th className="p-4 font-bold text-xs uppercase opacity-60">Título / Categoria</th>
                  <th className="p-4 font-bold text-xs uppercase opacity-60">Tipo</th>
                  <th className="p-4 font-bold text-xs uppercase opacity-60 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {videos.map(video => (
                  <tr key={video.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <img src={video.thumbnail} className="w-24 aspect-video object-cover rounded-lg" alt="" />
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-sm">{video.title}</p>
                      <p className="text-xs text-brand-primary font-medium">{video.category.toUpperCase()}</p>
                    </td>
                    <td className="p-4 text-xs font-bold uppercase">{video.type}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => { if(confirm('Excluir este vídeo?')) deleteVideo(video.id) }}
                          className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
             <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="p-4 font-bold text-xs uppercase opacity-60">Nome da Categoria</th>
                  <th className="p-4 font-bold text-xs uppercase opacity-60">Slug (ID)</th>
                  <th className="p-4 font-bold text-xs uppercase opacity-60">Vídeos</th>
                  <th className="p-4 font-bold text-xs uppercase opacity-60 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {categories.map(cat => (
                  <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold">{cat.name}</td>
                    <td className="p-4 font-mono text-xs opacity-60">{cat.slug}</td>
                    <td className="p-4">
                      <span className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold">
                        {videos.filter(v => v.category === cat.slug).length}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => { if(confirm('Excluir categoria? Vídeos nela podem sumir da Home.')) deleteCategory(cat.id) }}
                        className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'ads' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map(ad => (
              <div key={ad.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg group relative">
                <button 
                  onClick={() => deleteAd(ad.id)}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Trash2 size={14} />
                </button>
                
                <div className="aspect-[4/1] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden mb-4 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  {ad.htmlCode ? (
                    <div className="flex flex-col items-center gap-2 opacity-50">
                      <Code size={32} />
                      <span className="text-[10px] font-black">SCRIPT ATIVO</span>
                    </div>
                  ) : (
                    <img src={ad.imageUrl} className="w-full h-full object-cover" alt="" />
                  )}
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">{ad.position.toUpperCase()}</div>
                </div>
                <h3 className="font-bold text-lg truncate">{ad.title}</h3>
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2">
                    {ad.active ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />}
                    <span className="text-sm font-medium">{ad.active ? 'Ativo' : 'Desativado'}</span>
                  </div>
                  <button 
                    onClick={() => toggleAd(ad.id)}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${ad.active ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}
                  >
                    {ad.active ? 'Desativar' : 'Ativar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto w-full bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
            <h2 className="text-2xl font-black italic mb-6">CONFIGURAÇÕES DE DOAÇÃO</h2>
            <form onSubmit={handleSavePix} className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${editPix.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="font-bold">Seção de Doação: {editPix.active ? 'Ativa' : 'Oculta'}</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setEditPix({...editPix, active: !editPix.active})}
                  className={`px-4 py-2 rounded-lg text-xs font-black uppercase transition-all ${editPix.active ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}
                >
                  {editPix.active ? 'Desativar Seção' : 'Ativar Seção'}
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase opacity-60">Chave PIX</label>
                <input 
                  type="text" 
                  value={editPix.key}
                  onChange={e => setEditPix({...editPix, key: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary"
                  placeholder="Ex: luzplay@pix.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase opacity-60">URL da Imagem do QR Code</label>
                <input 
                  type="text" 
                  value={editPix.qrCodeUrl}
                  onChange={e => setEditPix({...editPix, qrCodeUrl: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary"
                  placeholder="https://link-da-imagem.com/qrcode.png"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2"
              >
                <Save size={20} /> SALVAR CONFIGURAÇÕES
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Add Video Modal */}
      {showAddVideoModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-brand-dark w-full max-w-2xl rounded-3xl p-8 shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setShowAddVideoModal(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><XCircle size={24} /></button>
            <h2 className="text-2xl font-black italic mb-8 uppercase">Novo Vídeo</h2>
            <form onSubmit={handleAddVideo} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Título" value={newVideo.title || ''} onChange={e => setNewVideo({...newVideo, title: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700" />
                <select value={newVideo.category} onChange={e => setNewVideo({...newVideo, category: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                </select>
                <input required type="text" placeholder="Link YouTube" value={newVideo.youtubeUrl || ''} onChange={e => setNewVideo({...newVideo, youtubeUrl: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700" />
                <input type="text" placeholder="Thumb URL" value={newVideo.thumbnail || ''} onChange={e => setNewVideo({...newVideo, thumbnail: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700" />
                <select value={newVideo.type} onChange={e => setNewVideo({...newVideo, type: e.target.value as any})} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 col-span-full">
                  <option value="16x9">Horizontal (16x9)</option>
                  <option value="9x16">Vertical (9x16 - Shorts)</option>
                </select>
                <textarea placeholder="Descrição" value={newVideo.description || ''} onChange={e => setNewVideo({...newVideo, description: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 col-span-full h-24" />
              </div>
              <button type="submit" className="w-full bg-brand-primary text-white font-black py-4 rounded-xl">SALVAR VÍDEO</button>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-brand-dark w-full max-w-md rounded-3xl p-8 shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setShowAddCategoryModal(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><XCircle size={24} /></button>
            <h2 className="text-2xl font-black italic mb-6 uppercase">Nova Categoria</h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase opacity-60">Nome Visível</label>
                <input required type="text" placeholder="Ex: Devocionais" value={newCat.name} onChange={e => setNewCat({...newCat, name: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase opacity-60">Slug (Ex: devocionais)</label>
                <input required type="text" placeholder="ex-categoria" value={newCat.slug} onChange={e => setNewCat({...newCat, slug: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700" />
              </div>
              <button type="submit" className="w-full bg-brand-primary text-white font-black py-4 rounded-xl mt-4">CRIAR CATEGORIA</button>
            </form>
          </div>
        </div>
      )}

      {/* Add Ad Modal */}
      {showAddAdModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-brand-dark w-full max-w-2xl rounded-3xl p-8 shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setShowAddAdModal(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><XCircle size={24} /></button>
            <h2 className="text-2xl font-black italic mb-4 uppercase">Novo Anúncio</h2>
            
            <div className="flex gap-4 mb-8 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button 
                onClick={() => setNewAd({...newAd, htmlCode: undefined, imageUrl: ''})}
                className={`flex-1 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${!newAd.htmlCode ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-50'}`}
              >
                <ImageIcon size={18} /> Banner Imagem
              </button>
              <button 
                onClick={() => setNewAd({...newAd, imageUrl: undefined, link: undefined, htmlCode: ''})}
                className={`flex-1 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${newAd.htmlCode !== undefined ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-50'}`}
              >
                <Code size={18} /> Script / AdSense
              </button>
            </div>

            <form onSubmit={handleAddAd} className="space-y-6">
              <div className="space-y-4">
                <input required type="text" placeholder="Nome Interno do Anúncio" value={newAd.title || ''} onChange={e => setNewAd({...newAd, title: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700" />
                
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase opacity-60">Onde o anúncio aparecerá?</label>
                  <select value={newAd.position} onChange={e => setNewAd({...newAd, position: e.target.value as any})} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <option value="top">Topo da Home</option>
                    <option value="sidebar">Barra Lateral (Categorias)</option>
                    <option value="footer">Rodapé</option>
                    <option value="pre-roll">Antes do Vídeo (Player)</option>
                    <option value="post-roll">Depois do Vídeo (Player)</option>
                  </select>
                </div>

                {newAd.htmlCode !== undefined ? (
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase opacity-60 flex items-center gap-2"><Code size={14} /> Código do Script (AdSense, etc)</label>
                    <textarea 
                      required
                      placeholder="Cole aqui o script fornecido pelo Google ou parceiro..." 
                      value={newAd.htmlCode || ''} 
                      onChange={e => setNewAd({...newAd, htmlCode: e.target.value})} 
                      className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 h-40 font-mono text-xs" 
                    />
                    <div className="flex items-start gap-2 text-amber-500 bg-amber-500/10 p-3 rounded-xl">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <p className="text-[10px] leading-tight font-medium uppercase">Atenção: Scripts podem demorar alguns minutos para carregar na página pública após serem salvos.</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    <input required type="text" placeholder="URL da Imagem do Banner" value={newAd.imageUrl || ''} onChange={e => setNewAd({...newAd, imageUrl: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700" />
                    <input required type="text" placeholder="Link de Destino (https://...)" value={newAd.link || ''} onChange={e => setNewAd({...newAd, link: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700" />
                  </div>
                )}
              </div>
              <button type="submit" className="w-full bg-brand-secondary text-white font-black py-4 rounded-xl shadow-lg shadow-brand-secondary/20">CRIAR ANÚNCIO</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
