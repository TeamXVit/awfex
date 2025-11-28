import { GoogleGenAI } from "@google/genai";

export async function gemini(apiKey, modelName, input) {
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: modelName,
    contents: input,
  });
  return response.text;
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
