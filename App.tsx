
import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ShortsPage from './pages/ShortsPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import { Smartphone, Play, Heart, Star, Mail } from 'lucide-react';

const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => (
  <footer className="bg-slate-100 dark:bg-brand-dark/50 border-t border-slate-200 dark:border-slate-800 py-12 px-4 mt-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
          LUZPLAY
        </h2>
        <p className="text-sm opacity-60">Sua plataforma de vídeos que iluminam o caminho. Reflexões, orações e mensagens bíblicas para o seu dia a dia.</p>
        
        {/* Atalhos Rápidos agora Funcionais */}
        <div className="flex gap-4">
          <button 
            onClick={() => onNavigate('shorts')}
            title="Ver Shorts (Vídeos Verticais)"
            className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all hover:scale-110 shadow-lg cursor-pointer"
          >
            <Smartphone size={20} />
          </button>
          <button 
            onClick={() => onNavigate('home')}
            title="Ir para o Início"
            className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all hover:scale-110 shadow-lg cursor-pointer"
          >
            <Play size={20} />
          </button>
          <button 
            onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                const favSection = document.getElementById('favorites-section');
                if (favSection) {
                  favSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  alert("Favorite alguns vídeos para vê-los em 'Minha Lista'!");
                }
              }, 100);
            }}
            title="Ver Meus Favoritos"
            className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all hover:scale-110 shadow-lg cursor-pointer"
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-4 uppercase text-xs tracking-widest opacity-60">Conteúdo</h4>
        <ul className="space-y-2 text-sm font-medium">
          <li><button onClick={() => onNavigate('home')} className="hover:text-brand-primary transition-colors">Reflexões</button></li>
          <li><button onClick={() => onNavigate('home')} className="hover:text-brand-primary transition-colors">Orações</button></li>
          <li><button onClick={() => onNavigate('home')} className="hover:text-brand-primary transition-colors">Estudo Bíblico</button></li>
          <li><button onClick={() => onNavigate('home')} className="hover:text-brand-primary transition-colors">Música Worship</button></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4 uppercase text-xs tracking-widest opacity-60">Plataforma</h4>
        <ul className="space-y-2 text-sm font-medium">
          <li><a href="#" className="hover:text-brand-primary transition-colors">Sobre Nós</a></li>
          <li><a href="#" className="hover:text-brand-primary transition-colors">Seja um Colaborador</a></li>
          <li><a href="#" className="hover:text-brand-primary transition-colors">Privacidade</a></li>
          <li><a href="#" className="hover:text-brand-primary transition-colors">Contato</a></li>
        </ul>
      </div>
      <div className="bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 p-6 rounded-3xl border border-brand-primary/20">
        <div className="flex items-center gap-2 mb-2 text-brand-primary">
          <Mail className="fill-none" size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Newsletter da Fé</span>
        </div>
        <p className="text-sm font-bold mb-4 italic">Receba uma mensagem de esperança toda manhã no seu e-mail.</p>
        <div className="flex flex-col gap-2">
          <input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            className="w-full bg-white dark:bg-slate-800 px-4 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-brand-primary"
          />
          <button className="w-full bg-brand-primary text-white font-black py-2.5 rounded-xl hover:scale-105 transition-transform text-sm">INSCREVER-SE</button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs opacity-40">
      &copy; {new Date().getFullYear()} LuzPlay - Todos os direitos reservados. Vídeos que edificam a sua vida.
    </div>
  </footer>
);

const NavigationWrapper: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home />;
      case 'shorts': return <ShortsPage />;
      case 'admin': return <AdminDashboard onLogout={() => setCurrentPage('home')} />;
      case 'login': return <LoginPage onSuccess={() => setCurrentPage('admin')} />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="animate-in fade-in duration-700">
        {renderPage()}
      </main>
      {currentPage !== 'shorts' && currentPage !== 'admin' && <Footer onNavigate={setCurrentPage} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <NavigationWrapper />
    </AppProvider>
  );
};

export default App;
