
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { GeoAnalysisResult, AnalysisMode } from "./types";

export const analyzeGeologicalSample = async (
  base64Image: string, 
  mode: AnalysisMode,
  fusionData?: { slope: number, curvature: number, ndvi: number, clayIndex: number }
): Promise<GeoAnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  let systemInstruction = "";
  let responseSchema: any = {};

  switch (mode) {
    case 'FUSION':
      systemInstruction = `Act as a Senior Multi-Modal Geological Researcher. You are analyzing data from a Fusion Architecture that integrates:
      1. CNN Vision Branch: Analyzes 224x224 RGB lithological textures.
      2. Geomorphology Branch: Processes DEM Slope (${fusionData?.slope}°), Curvature (${fusionData?.curvature}), and Satellite Indices (NDVI: ${fusionData?.ndvi}, Clay Index: ${fusionData?.clayIndex}).
      
      Your task is to perform 'Decision-Level Fusion':
      - Correlate visual mineralogy with terrain stability (Slope/Curvature).
      - Use NDVI/Clay Index to filter vegetation noise and identify spectral mineral signatures.
      - Provide a 'SCI-LEVEL' interpretation of the paleo-environment, specifically identifying potential mineral accumulation zones or fluvial depositional history.
      - Output the 'fusionLogic' as a set of specific technical deductions where visual and numeric data intersect.`;
      
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          identified: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          interpretation: { type: Type.STRING },
          fusionLogic: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific insights derived from fusing data types." },
          formationDetails: { type: Type.STRING }
        },
        required: ["identified", "confidence", "interpretation", "fusionLogic", "formationDetails"]
      };
      break;

    case 'GRAIN':
      systemInstruction = `Act as a sedimentologist. Analyze grain roundness (Angular to Well Rounded) and sphericity (Low to High). Explain transport history.`;
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          identified: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          roundness: { type: Type.STRING, enum: ['Angular', 'Sub-Angular', 'Sub-Rounded', 'Well Rounded'] },
          sphericity: { type: Type.STRING, enum: ['Low', 'Moderate', 'High'] },
          interpretation: { type: Type.STRING },
          formationDetails: { type: Type.STRING }
        },
        required: ["identified", "confidence", "roundness", "sphericity", "interpretation", "formationDetails"]
      };
      break;

    case 'GEM':
      systemInstruction = `Act as a gemologist. Differentiate between gems and look-alikes. Evaluate transparency and crystal regularity.`;
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          identified: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          mineralStatus: { type: Type.STRING, enum: ['Probable Gemstone', 'Look-Alike Mineral', 'Indeterminate'] },
          transparency: { type: Type.STRING },
          interpretation: { type: Type.STRING },
          formationDetails: { type: Type.STRING }
        },
        required: ["identified", "confidence", "mineralStatus", "interpretation", "formationDetails"]
      };
      break;

    case 'PALEO':
      systemInstruction = `Act as a geomorphologist. Analyze outcrop for paleo-channel reconstruction (Meandering, Braided, Incised).`;
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          identified: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          channelType: { type: Type.STRING, enum: ['Meandering', 'Braided', 'Incised', 'Anastomosing'] },
          energyLevel: { type: Type.STRING, enum: ['Low', 'Moderate', 'High'] },
          interpretation: { type: Type.STRING },
          formationDetails: { type: Type.STRING }
        },
        required: ["identified", "confidence", "channelType", "energyLevel", "interpretation", "formationDetails"]
      };
      break;

    case 'PETRO':
      systemInstruction = `Act as a petrologist specializing in igneous rocks. 
      Identify the silica saturation level:
      - Oversaturated (contains free quartz)
      - Saturated (contains neither free quartz nor feldspathoids)
      - Undersaturated (contains feldspathoids like nepheline or leucite).
      Determine the alkalinity:
      - Alkaline (high total alkalis relative to silica)
      - Sub-Alkaline (Tholeiitic or Calc-Alkaline)
      - Calc-Alkaline (typical of subduction environments).
      Identify the rock series and list key minerals observed.`;
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          identified: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          silicaSaturation: { type: Type.STRING, enum: ['Oversaturated', 'Saturated', 'Undersaturated'] },
          alkalinity: { type: Type.STRING, enum: ['Alkaline', 'Sub-Alkaline', 'Calc-Alkaline'] },
          rockSeries: { type: Type.STRING },
          mineralogy: { type: Type.ARRAY, items: { type: Type.STRING } },
          interpretation: { type: Type.STRING },
          formationDetails: { type: Type.STRING }
        },
        required: ["identified", "confidence", "silicaSaturation", "alkalinity", "rockSeries", "interpretation", "formationDetails"]
      };
      break;

    default:
      systemInstruction = `Act as an expert geologist. Identify the sample, categorize it as Igneous, Sedimentary, or Metamorphic, and provide its mineral composition and fluvial context.`;
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          identified: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          rockType: { type: Type.STRING, enum: ['Igneous', 'Sedimentary', 'Metamorphic', 'Unknown'] },
          composition: { type: Type.STRING, description: "Primary mineral composition" },
          interpretation: { type: Type.STRING },
          fluvialContext: { type: Type.STRING },
          geologicalAge: { type: Type.STRING },
          formationDetails: { type: Type.STRING }
        },
        required: ["identified", "confidence", "rockType", "composition", "interpretation", "formationDetails"]
      };
  }

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] || base64Image } },
        { text: systemInstruction }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema
    }
  });

  const text = response.text;
  if (!text) throw new Error("No analysis returned from AI");
  
  return { ...JSON.parse(text), mode } as GeoAnalysisResult;
};
