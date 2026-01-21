
import React, { useRef } from 'react';

interface Props {
  onUpload: (base64: string) => void;
  isLoading: boolean;
  currentImage: string | null;
}

const FileUploader: React.FC<Props> = ({ onUpload, isLoading, currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <div className={`
        border-2 border-dashed rounded-xl p-8 transition-all
        ${currentImage ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 hover:border-emerald-400 bg-slate-50'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}>
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          disabled={isLoading}
        />

        {currentImage ? (
          <div className="flex flex-col items-center">
            <img src={currentImage} alt="Preview" className="w-full max-h-80 object-cover rounded-lg shadow-md mb-6" />
            {!isLoading && (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full font-semibold transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Change Sample</span>
              </button>
            )}
          </div>
        ) : (
          <div 
            onClick={() => !isLoading && fileInputRef.current?.click()}
            className="flex flex-col items-center py-10"
          >
            <div className="bg-white p-4 rounded-full shadow-sm border border-slate-100 mb-4">
              <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-slate-800 font-semibold mb-1">Capture or Upload Sample</p>
            <p className="text-slate-500 text-sm">Drag and drop, or click to browse</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
