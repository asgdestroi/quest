
import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-3xl font-bold tracking-tight text-sky-400 hover:text-sky-300 transition-colors">
            Quiz de Artes <span className="text-sm text-slate-400">Cidade Cinza</span>
          </Link>
          <nav className="space-x-4">
            <Link to="/" className="text-slate-300 hover:text-sky-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Início</Link>
            <Link to="/aluno" className="text-slate-300 hover:text-sky-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Aluno</Link>
            <Link to="/professor" className="text-slate-300 hover:text-sky-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Professor</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-slate-900 text-center py-6 text-sm text-slate-500 border-t border-slate-700">
        © {new Date().getFullYear()} Professor André. Todos os direitos reservados.
      </footer>
    </div>
  );
};
