
import React from 'react';

const CLASSES = [
    { name: "Conglomerate", round: 0.85, status: "Validated" },
    { name: "Breccia", round: 0.25, status: "Validated" },
    { name: "Sandstone", round: 0.55, status: "Validated" },
    { name: "Limestone", round: 0.60, status: "Validated" },
    { name: "Basalt", round: 0.40, status: "Edge-Case" },
    { name: "Granite", round: 0.45, status: "Validated" },
    { name: "Gneiss", round: 0.50, status: "Validated" },
    { name: "Quartzite", round: 0.65, status: "Validated" },
    { name: "River clast", round: 0.90, status: "Validated" },
    { name: "Gemstone", round: 0.80, status: "High-Prec" },
    { name: "Fossil Shell", round: 0.75, status: "Validated" },
    { name: "Paleo Channel", round: 0.30, status: "Validated" }
];

const TrainingLab: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl animate-in fade-in zoom-in-95 duration-500 mb-12">
      {/* OS Header */}
      <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          </div>
          <span className="text-xs font-mono text-slate-400">FLUVIO_FUSION_ENGINE://v3.1_MOBILE_OPT</span>
        </div>
        <div className="flex items-center space-x-4">
            <span className="text-[10px] font-mono text-emerald-500 animate-pulse">● TFLITE_INTERPRETER_ACTIVE</span>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">M. Yasin Khan | Architect</span>
        </div>
      </div>

      <div className="p-8">
        {/* Multi-Modal Architecture Diagram */}
        <div className="mb-12">
          <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-6 border-l-2 border-emerald-500 pl-2">I. Multi-Modal Fusion Architecture (SCI-Level)</h3>
          <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              {/* Image Branch */}
              <div className="space-y-4 relative">
                <p className="text-[9px] font-bold text-blue-400 uppercase mb-2">Branch A: Vision (CNN)</p>
                <div className="flex flex-col space-y-2 font-mono text-[9px]">
                  <div className="p-2 bg-slate-800 border-l-2 border-blue-500 text-slate-300">Input: 224x224x3 [RGB]</div>
                  <div className="p-2 bg-slate-800 border-l-2 border-blue-500 text-slate-300">Conv2D + MaxPool x 3</div>
                  <div className="p-2 bg-slate-800 border-l-2 border-blue-500 text-slate-300">Global Average Flatten</div>
                </div>
                {/* Connection Line */}
                <div className="hidden md:block absolute -bottom-8 left-1/2 w-px h-8 bg-gradient-to-b from-blue-500 to-emerald-500"></div>
              </div>

              {/* DEM Branch */}
              <div className="space-y-4 relative">
                <p className="text-[9px] font-bold text-amber-400 uppercase mb-2">Branch B: Geomorphology (DEM/SAT)</p>
                <div className="flex flex-col space-y-2 font-mono text-[9px]">
                  <div className="p-2 bg-slate-800 border-l-2 border-amber-500 text-slate-300">Input: [Slope, NDVI, Clay, Curv]</div>
                  <div className="p-2 bg-slate-800 border-l-2 border-amber-500 text-slate-300">Dense Layer (64 Units)</div>
                  <div className="p-2 bg-slate-800 border-l-2 border-amber-500 text-slate-300">Batch Normalization</div>
                </div>
                {/* Connection Line */}
                <div className="hidden md:block absolute -bottom-8 left-1/2 w-px h-8 bg-gradient-to-b from-amber-500 to-emerald-500"></div>
              </div>
            </div>

            {/* Concatenation Logic */}
            <div className="mt-8 flex flex-col items-center relative z-10">
              <div className="bg-emerald-600 px-6 py-2 rounded-full text-[10px] font-bold text-white shadow-lg shadow-emerald-900 uppercase tracking-widest flex items-center space-x-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                </svg>
                <span>Concatenate(A, B)</span>
              </div>
              <div className="w-px h-8 bg-emerald-500"></div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center w-full md:w-72 shadow-2xl">
                <p className="text-[10px] font-mono text-emerald-400 font-bold mb-1">Dense(256) + Dropout(0.4)</p>
                <div className="w-full bg-slate-700 h-1 rounded-full mb-2">
                  <div className="bg-emerald-500 h-full w-full animate-pulse"></div>
                </div>
                <p className="text-[9px] font-mono text-emerald-300">Softmax Output: 14 Litho-Classes</p>
              </div>
            </div>
            
            {/* Background Grid Accent */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* II. TFLITE METRICS */}
          <div className="space-y-6">
            <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-4 border-l-2 border-emerald-500 pl-2">II. Mobile Deployment (TFLite)</h3>
            <div className="p-4 bg-slate-950 border border-emerald-900/50 text-white rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Optimization Result</span>
                <span className="bg-emerald-900 text-emerald-400 text-[8px] px-1.5 rounded">PASSED</span>
              </div>
              <div className="space-y-3 font-mono text-[9px]">
                <div className="flex justify-between text-slate-400"><span>Original (h5):</span><span>118.4 MB</span></div>
                <div className="flex justify-between text-emerald-400 font-bold"><span>TFLite Opt:</span><span>34.2 MB</span></div>
                <div className="flex justify-between text-slate-400"><span>Quantization:</span><span>Float16</span></div>
                <div className="flex justify-between text-slate-400"><span>Inference:</span><span>~14ms</span></div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="w-full bg-slate-800 h-1 rounded-full mb-1">
                  <div className="bg-emerald-500 h-full w-[70%] rounded-full"></div>
                </div>
                <p className="text-[8px] text-slate-500 uppercase">Size Reduction: 71.1%</p>
              </div>
            </div>
          </div>

          {/* III. EVALUATION CURVES */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-4 border-l-2 border-emerald-500 pl-2">III. Performance Evaluation</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative h-40 overflow-hidden group">
                    <p className="absolute top-2 left-3 text-[8px] text-slate-500 uppercase tracking-widest z-10">ROC Matrix</p>
                    <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <line x1="0" y1="100" x2="100" y2="0" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
                        <path d="M0,100 Q5,5 100,0" fill="none" stroke="#10b981" strokeWidth="2" />
                        <path d="M0,100 Q20,30 100,0" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.3" />
                    </svg>
                    <div className="absolute bottom-2 right-3 text-right">
                        <p className="text-[10px] font-bold text-emerald-400 font-mono">AUC 0.99</p>
                    </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative h-40 overflow-hidden group">
                    <p className="absolute top-2 left-3 text-[8px] text-slate-500 uppercase tracking-widest z-10">PR Curve</p>
                    <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,0 H85 Q98,2 100,100" fill="none" stroke="#10b981" strokeWidth="2" />
                    </svg>
                    <div className="absolute bottom-2 right-3 text-right">
                        <p className="text-[10px] font-bold text-emerald-400 font-mono">mAP 0.97</p>
                    </div>
                </div>
            </div>
          </div>

          {/* IV. MODEL ROADMAP */}
          <div className="space-y-6">
            <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-4 border-l-2 border-emerald-500 pl-2">IV. Model Roadmap</h3>
            <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-900/50 space-y-4">
                {[
                  { label: 'Synthetic CNN Base', progress: 100 },
                  { label: 'Multi-Modal Fusion', progress: 100 },
                  { label: 'TFLite Conversion', progress: 100 },
                  { label: 'Field Validation', progress: 75 },
                ].map((step, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="text-slate-300 font-bold">{step.label}</span>
                      <span className="text-emerald-400 font-mono">{step.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${step.progress === 100 ? 'bg-emerald-500' : 'bg-emerald-500/50 animate-pulse'}`} 
                        style={{ width: `${step.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-2 py-2 bg-emerald-600 text-white text-[10px] font-bold uppercase rounded hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-950 active:scale-95">
                    Download Android SDK
                </button>
            </div>
          </div>
        </div>

        {/* TARGET REGISTRY */}
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] border-l-2 border-emerald-500 pl-2">V. Multi-Modal Class Registry</h3>
                <span className="text-[8px] text-slate-500 font-mono">SYNTHETIC_DATASET_v3.0</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {CLASSES.map((c, i) => (
                <div key={i} className="bg-slate-950 p-3 rounded border border-slate-800 hover:border-emerald-500/50 transition-all cursor-default">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-200 truncate">{c.name}</span>
                    <span className="text-[7px] text-emerald-500 uppercase font-bold">{c.status}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-[1px] rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${c.round * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingLab;
