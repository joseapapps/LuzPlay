
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Search, Menu, X, User, LogIn, LayoutDashboard, PlayCircle, Smartphone, LogOut, Clock, Calendar } from 'lucide-react';

const Navbar: React.FC<{ onNavigate: (page: string) => void, currentPage: string }> = ({ onNavigate, currentPage }) => {
  const { isDarkMode, setDarkMode, isAdmin, setAdmin, searchTerm, setSearchTerm } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [now, setNow] = useState(new Date());

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const NavItems = [
    { label: 'Início', page: 'home', icon: PlayCircle },
    { label: 'Shorts', page: 'shorts', icon: Smartphone },
  ];

  const handleLogout = () => {
    setAdmin(false);
    onNavigate('home');
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar - Data e Hora (Tamanho Aumentado) */}
      <div className="bg-slate-100 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm sm:text-base font-black uppercase tracking-tight sm:tracking-widest text-slate-700 dark:text-slate-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <Calendar size={18} className="text-brand-primary" />
              <span className="hidden sm:inline">{formatDate(now)}</span>
              <span className="sm:hidden">{now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-brand-primary">
            <Clock size={18} />
            <span className="tabular-nums drop-shadow-sm">{formatTime(now)}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-brand-light/90 dark:bg-brand-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer shrink-0"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <PlayCircle className="text-white w-6 h-6 fill-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary hidden sm:block">
              LUZPLAY
            </h1>
          </div>

          {/* Desktop Nav & Search */}
          <div className="flex-1 flex items-center justify-center gap-8">
            <div className="hidden md:flex items-center gap-8">
              {NavItems.map(item => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`text-sm font-black uppercase tracking-widest transition-colors hover:text-brand-primary ${currentPage === item.page ? 'text-brand-primary' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Real-time Search Bar */}
            <div className={`relative flex items-center transition-all duration-500 ${isSearchVisible ? 'w-full max-w-md' : 'w-10'}`}>
              <input 
                type="text"
                placeholder="Buscar vídeos, mensagens, orações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchVisible(true)}
                onBlur={() => !searchTerm && setIsSearchVisible(false)}
                className={`w-full bg-slate-200 dark:bg-slate-800/50 border border-transparent focus:border-brand-primary/50 rounded-full py-2 pl-10 pr-4 outline-none transition-all ${isSearchVisible ? 'opacity-100' : 'opacity-0 cursor-default'}`}
              />
              <button 
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                className="absolute left-0 p-2.5 text-slate-500 hover:text-brand-primary transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button 
              onClick={() => setDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => isAdmin ? onNavigate('admin') : onNavigate('login')}
                className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${isAdmin ? 'bg-brand-primary text-white' : 'bg-slate-200 dark:bg-slate-800 hover:bg-brand-primary hover:text-white'}`}
              >
                {isAdmin ? <LayoutDashboard size={16} /> : <User size={16} />}
                <span className="hidden lg:inline">{isAdmin ? 'Painel' : 'Entrar'}</span>
              </button>
              
              {isAdmin && (
                <button 
                  onClick={handleLogout}
                  className="hidden sm:flex p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all border border-transparent hover:border-red-500"
                  title="Sair do Modo Admin"
                >
                  <LogOut size={18} />
                </button>
              )}
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-brand-light dark:bg-brand-dark border-b border-slate-200 dark:border-slate-800 animate-in slide-in-from-top duration-300 p-4 shadow-xl">
            <div className="flex flex-col gap-2">
              {NavItems.map(item => (
                <button
                  key={item.page}
                  onClick={() => { onNavigate(item.page); setIsMenuOpen(false); }}
                  className="flex items-center gap-4 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl font-bold"
                >
                  <item.icon size={20} className="text-brand-primary" /> {item.label}
                </button>
              ))}
              <hr className="my-2 border-slate-200 dark:border-slate-800" />
              <button
                onClick={() => { isAdmin ? onNavigate('admin') : onNavigate('login'); setIsMenuOpen(false); }}
                className="flex items-center gap-4 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl font-bold"
              >
                {isAdmin ? <LayoutDashboard size={20} className="text-brand-primary" /> : <User size={20} className="text-brand-primary" />}
                {isAdmin ? 'Painel Admin' : 'Acessar Conta'}
              </button>
              {isAdmin && (
                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="flex items-center gap-4 p-4 text-red-500 hover:bg-red-500/10 rounded-2xl font-bold"
                >
                  <LogOut size={20} /> Encerrar Sessão
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
