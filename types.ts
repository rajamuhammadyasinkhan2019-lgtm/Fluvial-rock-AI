
export type AnalysisMode = 'GENERAL' | 'GRAIN' | 'GEM' | 'PALEO' | 'TRAINING' | 'FUSION' | 'PETRO';

export interface GeoAnalysisResult {
  mode: AnalysisMode;
  identified: string;
  confidence: number;
  interpretation: string;
  
  // Mode-specific fields
  roundness?: 'Angular' | 'Sub-Angular' | 'Sub-Rounded' | 'Well Rounded';
  sphericity?: 'Low' | 'Moderate' | 'High';
  mineralStatus?: 'Probable Gemstone' | 'Look-Alike Mineral' | 'Indeterminate';
  transparency?: string;
  channelType?: 'Meandering' | 'Braided' | 'Incised' | 'Anastomosing';
  energyLevel?: 'Low' | 'Moderate' | 'High';
  
  // Petrographic fields
  silicaSaturation?: 'Oversaturated' | 'Saturated' | 'Undersaturated';
  alkalinity?: 'Alkaline' | 'Sub-Alkaline' | 'Calc-Alkaline';
  rockSeries?: string;
  mineralogy?: string[];
  
  rockType?: 'Igneous' | 'Sedimentary' | 'Metamorphic' | 'Unknown';
  composition?: string;
  
  // Fusion fields
  demContext?: {
    slope: number;
    curvature: number;
  };
  satelliteContext?: {
    ndvi: number;
    clayIndex: number;
  };
  fusionLogic?: string[];
  
  fluvialContext?: string;
  geologicalAge?: string;
  formationDetails: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
