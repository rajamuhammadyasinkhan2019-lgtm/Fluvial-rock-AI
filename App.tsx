
import React, { useState, useCallback } from 'react';
import { analyzeGeologicalSample } from './geminiService';
import { GeoAnalysisResult, AppStatus, AnalysisMode } from './types';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import AnalysisResult from './components/AnalysisResult';
import Footer from './components/Footer';
import ModuleSelector from './components/ModuleSelector';
import TrainingLab from './components/TrainingLab';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mode, setMode] = useState<AnalysisMode>('GENERAL');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<GeoAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Fusion Context Data
  const [fusionData, setFusionData] = useState({
    slope: 12,
    curvature: 0.1,
    ndvi: 0.35,
    clayIndex: 1.2
  });

  const handleImageUpload = useCallback(async (base64: string, selectedMode: AnalysisMode = mode) => {
    setImage(base64);
    setStatus(AppStatus.LOADING);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeGeologicalSample(base64, selectedMode, selectedMode === 'FUSION' ? fusionData : undefined);
      setResult(analysis);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      console.error("Analysis failed:", err);
      setError("Fusion analysis failed. Verify image quality and data indices.");
      setStatus(AppStatus.ERROR);
    }
  }, [mode, fusionData]);

  const reset = () => {
    setImage(null);
    setStatus(AppStatus.IDLE);
    setResult(null);
    setError(null);
  };

  const handleModeSelect = (m: AnalysisMode) => {
    setMode(m);
    if (m === 'TRAINING') {
        setStatus(AppStatus.IDLE);
        setResult(null);
        return;
    }
    if (image) handleImageUpload(image, m);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <ModuleSelector currentMode={mode} onSelect={handleModeSelect} />
        </div>

        {mode === 'TRAINING' ? (
          <TrainingLab />
        ) : (
          <>
            {mode === 'FUSION' && (
              <div className="bg-slate-900 rounded-2xl p-6 mb-8 border border-slate-700 shadow-2xl animate-in slide-in-from-top-4 duration-500">
                <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6">Multi-Modal Fusion Parameters</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400">
                      <span>DEM Slope</span>
                      <span className="text-emerald-500">{fusionData.slope}°</span>
                    </div>
                    <input type="range" min="0" max="45" value={fusionData.slope} onChange={(e) => setFusionData({...fusionData, slope: Number(e.target.value)})} className="w-full accent-emerald-500 h-1" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400">
                      <span>NDVI</span>
                      <span className="text-emerald-500">{fusionData.ndvi}</span>
                    </div>
                    <input type="range" min="0" max="1" step="0.01" value={fusionData.ndvi} onChange={(e) => setFusionData({...fusionData, ndvi: Number(e.target.value)})} className="w-full accent-emerald-500 h-1" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400">
                      <span>Clay Index</span>
                      <span className="text-emerald-500">{fusionData.clayIndex}</span>
                    </div>
                    <input type="range" min="0" max="3" step="0.1" value={fusionData.clayIndex} onChange={(e) => setFusionData({...fusionData, clayIndex: Number(e.target.value)})} className="w-full accent-emerald-500 h-1" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400">
                      <span>Curvature</span>
                      <span className="text-emerald-500">{fusionData.curvature}</span>
                    </div>
                    <input type="range" min="-1" max="1" step="0.05" value={fusionData.curvature} onChange={(e) => setFusionData({...fusionData, curvature: Number(e.target.value)})} className="w-full accent-emerald-500 h-1" />
                  </div>
                </div>
              </div>
            )}

            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-2">Sample Acquisition</h2>
                <p className="text-slate-600 text-sm mb-6">
                  Ready for {mode === 'FUSION' ? 'Decision-Level AI Integration' : mode.toLowerCase() + ' classification'}. 
                  Target resolution: 224x224.
                </p>

                <FileUploader 
                  onUpload={handleImageUpload} 
                  isLoading={status === AppStatus.LOADING} 
                  currentImage={image}
                />
              </div>
            </section>

            {status === AppStatus.LOADING && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-600 font-bold animate-pulse tracking-widest uppercase text-[10px]">Synchronizing Modalities & Inference...</p>
              </div>
            )}

            {status === AppStatus.ERROR && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start space-x-3 mb-8">
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {status === AppStatus.SUCCESS && result && (
              <AnalysisResult result={result} reset={reset} />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
