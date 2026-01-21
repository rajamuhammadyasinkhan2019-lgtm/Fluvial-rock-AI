
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center text-white font-bold">F</div>
              <span className="text-white font-bold tracking-tight">FluvioRock AI</span>
            </div>
            <p className="text-sm max-w-xs leading-relaxed">
              Advancing geological field work through machine vision and expert fluvial analysis systems.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-2">
            <p className="text-sm text-slate-200">
              <span className="text-slate-500">Expert App Architect:</span> <span className="font-semibold">Muhammad Yasin Khan</span>
            </p>
            <p className="text-sm">
              <span className="text-slate-500">Core Engine:</span> <span className="text-emerald-500 font-semibold">Google Gemini 3 Flash Preview</span>
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs uppercase tracking-widest font-medium">© 2024 Geological Solutions International</p>
          <div className="flex space-x-6 text-xs uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">API Access</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
