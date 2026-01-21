
import React from 'react';
import { AnalysisMode } from '../types';

interface Props {
  currentMode: AnalysisMode;
  onSelect: (mode: AnalysisMode) => void;
}

const modules: { id: AnalysisMode; label: string; icon: string; desc: string }[] = [
  { id: 'GENERAL', label: 'General ID', icon: '🔍', desc: 'Lithology context' },
  { id: 'GRAIN', label: 'Grain Shape', icon: '📐', desc: 'Wadell metrics' },
  { id: 'GEM', label: 'Gem/Mineral', icon: '💎', desc: 'Discrimination' },
  { id: 'FUSION', label: 'Multi-Modal', icon: '📡', desc: 'CNN + DEM + SAT' },
  { id: 'TRAINING', label: 'Research Lab', icon: '🧪', desc: 'Synthetic Backbone' },
];

const ModuleSelector: React.FC<Props> = ({ currentMode, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {modules.map((mod) => (
        <button
          key={mod.id}
          onClick={() => onSelect(mod.id)}
          className={`
            p-4 rounded-xl border transition-all text-left flex flex-col space-y-1
            ${currentMode === mod.id 
              ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200 translate-y-[-2px]' 
              : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-slate-50'}
          `}
        >
          <span className="text-2xl mb-1">{mod.icon}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider leading-none">{mod.label}</span>
          <span className={`text-[8px] leading-tight ${currentMode === mod.id ? 'text-emerald-100' : 'text-slate-400'}`}>
            {mod.desc}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ModuleSelector;
