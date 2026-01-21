
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-6xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-600 p-2 rounded-lg shadow-inner">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h1 className="geo-title text-2xl font-bold text-slate-900 tracking-tight">
              FluvioRock <span className="text-emerald-600">AI</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Geological Intelligence System</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <span className="text-sm font-medium text-slate-600">v2.5 Professional</span>
          <div className="h-4 w-px bg-slate-200"></div>
          <a href="#" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Documentation</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
