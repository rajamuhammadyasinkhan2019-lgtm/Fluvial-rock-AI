
export type AnalysisMode = 'GENERAL' | 'GRAIN' | 'GEM' | 'PALEO' | 'TRAINING' | 'FUSION';

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
