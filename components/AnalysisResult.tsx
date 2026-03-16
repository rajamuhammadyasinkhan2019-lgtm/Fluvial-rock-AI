
import React from 'react';
import { GeoAnalysisResult } from '../types';

interface Props {
  result: GeoAnalysisResult;
  reset: () => void;
}

const AnalysisResult: React.FC<Props> = ({ result, reset }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-200">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 leading-none">Analysis Matrix</h2>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Mode: {result.mode.replace('_', ' ')} System</p>
          </div>
        </div>
        <button 
          onClick={reset}
          className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
        >
          Reset Engine
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-emerald-600 text-white rounded-2xl p-6 shadow-xl shadow-emerald-200/50 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <p className="text-emerald-100 text-[10px] font-bold uppercase tracking-widest mb-1 relative z-10">CNN Probability Target</p>
            <p className="text-3xl font-black leading-tight mb-4 relative z-10">{result.identified}</p>
            <div className="pt-4 border-t border-emerald-500/50 flex justify-between items-center relative z-10">
              <span className="text-[10px] uppercase font-bold text-emerald-200 tracking-widest">Confidence Score</span>
              <span className="text-2xl font-mono font-bold">{result.confidence.toFixed(1)}%</span>
            </div>
          </div>

          {result.fusionLogic && (
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-700 shadow-2xl">
               <div className="flex items-center space-x-2 mb-6">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Decision Integration Logic</h4>
               </div>
               <ul className="space-y-4">
                  {result.fusionLogic.map((logic, idx) => (
                    <li key={idx} className="flex items-start space-x-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                      <p className="text-[11px] leading-relaxed text-slate-300 font-medium">"{logic}"</p>
                    </li>
                  ))}
               </ul>
            </div>
          )}

          {result.mode === 'GRAIN' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-1">Roundness</p>
                <p className="text-sm font-bold text-slate-800">{result.roundness}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-1">Sphericity</p>
                <p className="text-sm font-bold text-slate-800">{result.sphericity}</p>
              </div>
            </div>
          )}

          {result.mode === 'GENERAL' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-1">Rock Type</p>
                  <p className="text-sm font-bold text-slate-800">{result.rockType}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-1">Composition</p>
                  <p className="text-sm font-bold text-slate-800">{result.composition}</p>
                </div>
              </div>
              {result.geologicalAge && (
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-1">Geological Age</p>
                  <p className="text-sm font-bold text-slate-800">{result.geologicalAge}</p>
                </div>
              )}
            </div>
          )}

          {result.mode === 'PETRO' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-1">Silica Saturation</p>
                  <p className="text-sm font-bold text-slate-800">{result.silicaSaturation}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-1">Alkalinity</p>
                  <p className="text-sm font-bold text-slate-800">{result.alkalinity}</p>
                </div>
              </div>
              {result.rockSeries && (
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-1">Rock Series</p>
                  <p className="text-sm font-bold text-slate-800">{result.rockSeries}</p>
                </div>
              )}
              {result.mineralogy && (
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-1">Mineralogy</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.mineralogy.map((m, i) => (
                      <span key={i} className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">{m}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
               <svg className="w-24 h-24 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/>
               </svg>
            </div>
            <h3 className="font-bold text-slate-900 mb-6 flex items-center space-x-2 border-b border-slate-100 pb-4">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" />
              </svg>
              <span>Fluvial Geomorphological Discussion</span>
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm md:text-base font-serif italic">
              {result.interpretation}
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <section className="bg-slate-950 text-slate-100 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
               <div>
                  <div className="flex items-center space-x-2 mb-4 text-emerald-400 font-bold uppercase tracking-widest text-[9px]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Petrogenesis Root</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-[11px] font-mono">
                    {result.formationDetails}
                  </p>
               </div>
             </section>

             <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex flex-col items-center justify-center text-center">
                <p className="text-emerald-800 font-bold uppercase tracking-widest text-[10px] mb-4">SCI-Ready Summary</p>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-200 mb-4">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                   </svg>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all shadow-md shadow-emerald-200 active:scale-95">
                   Export Data Packet (.CSV)
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
