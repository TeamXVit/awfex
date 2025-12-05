import { GoogleGenAI } from "@google/genai";

const geminiCache = new Map();

export async function gemini(apiKey, modelName, input) {
  const cacheKey = JSON.stringify({ apiKey, modelName, input });
  if (geminiCache.has(cacheKey)) {
    return geminiCache.get(cacheKey);
  }
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: modelName,
    contents: input,
  });
  const text = response.text;
  geminiCache.set(cacheKey, text);
  return text;
}
export const geminiDescription = `
gemini(apiKey, modelName, input):
- Calls a Google Gemini model and returns its generated text output.
- Uses the provided API key, model name, and input content.

Parameters:
  apiKey: String — Google API key used for authentication.
  modelName: String — Name of the Gemini model to run.
  input: Any — The prompt or content sent to the model.

Returns:
  String — The generated text response from Gemini.
`;
