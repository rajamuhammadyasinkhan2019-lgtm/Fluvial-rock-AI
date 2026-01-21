
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
      systemInstruction = `Act as a Multi-Modal Geological Researcher. Integrate the provided visual image (CNN input) with the following numeric data:
      - DEM Slope: ${fusionData?.slope}°
      - DEM Curvature: ${fusionData?.curvature}
      - Satellite NDVI: ${fusionData?.ndvi}
      - Satellite Clay Index: ${fusionData?.clayIndex}
      Analyze the image for lithology and combine it with the terrain/spectral indices to provide a 'SCI-LEVEL' interpretation of the paleo-environment or mineral accumulation zones.`;
      
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

    default:
      systemInstruction = `Act as an expert geologist. Identify the sample and provide fluvial context.`;
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          identified: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          interpretation: { type: Type.STRING },
          fluvialContext: { type: Type.STRING },
          geologicalAge: { type: Type.STRING },
          formationDetails: { type: Type.STRING }
        },
        required: ["identified", "confidence", "interpretation", "formationDetails"]
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
