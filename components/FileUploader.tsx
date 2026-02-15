import React, { useState, useRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';

interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface Props {
  onUpload: (base64: string) => void;
  isLoading: boolean;
  currentImage: string | null;
}

const FileUploader: React.FC<Props> = ({ onUpload, isLoading, currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area
  ): Promise<string | null> => {
    try {
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return null;

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      return canvas.toDataURL('image/jpeg');
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const handleConfirmCrop = async () => {
    if (tempImage && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(tempImage, croppedAreaPixels);
      if (croppedImage) {
        onUpload(croppedImage);
        setTempImage(null);
      }
    }
  };

  const handleCancel = () => {
    setTempImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="relative">
      <div className={`
        border-2 border-dashed rounded-xl transition-all overflow-hidden
        ${currentImage || tempImage ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 hover:border-emerald-400 bg-slate-50'}
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

        {tempImage ? (
          <div className="flex flex-col items-center p-6">
            <div className="relative w-full h-80 bg-slate-900 rounded-lg overflow-hidden mb-6 shadow-inner">
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            
            <div className="w-full max-w-sm space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                  <span className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    <span>Magnification</span>
                  </span>
                  <span className="text-emerald-600 font-mono bg-emerald-100 px-2 py-0.5 rounded">{zoom.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex space-x-3 pb-2">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-600 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:border-slate-400 transition-all active:scale-95"
                >
                  Discard
                </button>
                <button
                  onClick={handleConfirmCrop}
                  className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95 flex items-center justify-center space-x-2"
                >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                   <span>Process ROI</span>
                </button>
              </div>
            </div>
          </div>
        ) : currentImage ? (
          <div className="flex flex-col items-center p-6">
            <div className="relative group w-full max-w-md">
              <img src={currentImage} alt="Preview" className="w-full max-h-80 object-contain rounded-lg shadow-xl mb-6 bg-slate-100 p-2 border border-slate-200" />
              <div className="absolute top-4 right-4 bg-emerald-600 text-white px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest shadow-lg">Sample Captured</div>
            </div>
            {!isLoading && (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center space-x-2 shadow-lg shadow-emerald-200 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>New Acquisition</span>
              </button>
            )}
          </div>
        ) : (
          <div 
            onClick={() => !isLoading && fileInputRef.current?.click()}
            className="flex flex-col items-center py-16 group"
          >
            <div className="bg-white p-5 rounded-full shadow-md border border-slate-100 mb-6 group-hover:scale-110 group-hover:bg-emerald-50 transition-all duration-300">
              <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-slate-800 font-bold mb-1 uppercase tracking-widest text-xs">Capture Geological Specimen</h3>
            <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">Drag and drop, or tap to browse local storage</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;