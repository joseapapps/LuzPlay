
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, User, PlayCircle, ArrowRight } from 'lucide-react';

const LoginPage: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { setAdmin } = useApp();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Credenciais atualizadas conforme solicitação
    if (user === 'Joseap' && pass === 'Jose7902#') {
      setAdmin(true);
      onSuccess();
    } else {
      setError('Credenciais inválidas. Por favor, verifique seu usuário e senha.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center shadow-xl shadow-brand-primary/20 mb-4">
            <PlayCircle className="text-white w-10 h-10 fill-white" />
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter">ACESSO ADMIN</h2>
          <p className="opacity-60 text-center mt-2">Área restrita aos administradores da LuzPlay.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase opacity-60 flex items-center gap-2"><User size={14} /> Usuário</label>
            <input 
              required
              type="text"
              value={user}
              onChange={e => setUser(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Digite seu usuário"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-black uppercase opacity-60 flex items-center gap-2"><Lock size={14} /> Senha</label>
            <input 
              required
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-black py-5 rounded-2xl flex items-center justify-center gap-2 group transition-all"
          >
            ENTRAR NO PAINEL <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
