// This is a Vercel Serverless Function that acts as a secure backend.
// It will live in the `api/` directory at the root of your project.

import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

// The API key is now safely stored on Vercel's servers, not in the browser.
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY is not set in Vercel environment variables.");
}
const ai = new GoogleGenAI({ apiKey });

const textModel = 'gemini-2.5-flash';
const visionModel = 'gemini-2.5-flash';

// This function will handle POST requests to `/api/analyzeTemplate`
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // We only allow POST requests to this endpoint
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { links, files } = req.body;
    
    if (!links || !files) {
        return res.status(400).json({ error: 'Missing links or files in the request body.' });
    }

    // --- 1. Analyze Competitor Videos (Server-side) ---
    const competitorPrompt = `
        Analyze the following YouTube videos to understand their narrative style, pacing, and verbal tone.
        These videos are competitors, and the goal is to create a template for similar, successful content.
        Provide a concise summary of the key elements that make them engaging. Focus on:
        1.  **Narrative Style:** Is it educational, story-driven, comedic, etc.?
        2.  **Pacing:** Is it fast-paced with quick cuts, or slow and deliberate?
        3.  **Verbal Tone:** Is the narrator energetic, calm, authoritative, humorous?
        4.  **Common Keywords/Phrases:** What recurring words or phrases are used to create impact?

        Video Links:
        ${links.join('\n')}

        Based on your analysis, provide a summary of findings that can be used as a "style guide" for a scriptwriter.
    `;
    const competitorAnalysisPromise = ai.models.generateContent({
        model: textModel,
        contents: competitorPrompt,
    });


    // --- 2. Analyze Visual Style (Server-side) ---
    const imageParts = files.map((file: { base64: string, type: string }) => ({
      inlineData: { mimeType: file.type, data: file.base64 },
    }));

    const visualPromptText = `
        Analyze the following images to understand their visual style. These images represent the desired aesthetic for a new YouTube video.
        Based on this visual information, generate a concise and effective prompt for an AI image generator (like Midjourney or DALL-E) to create similar visuals.
        The prompt should be a comma-separated list of keywords and phrases describing:
        - **Overall Mood/Atmosphere:** (e.g., cinematic, dramatic, futuristic, sterile)
        - **Color Palette:** (e.g., vibrant cyberpunk palette, muted earthy tones)
        - **Lighting:** (e.g., dramatic lighting, soft natural light)
        - **Composition & Shot Style:** (e.g., shallow depth of field, wide-angle shots)
        - **Artistic Medium/Style:** (e.g., hyperrealistic, 35mm film look, anime style)

        Generate only the prompt itself, without any introductory text.
    `;
    const visualStylePromise = ai.models.generateContent({
        model: visionModel,
        contents: { parts: [...imageParts, { text: visualPromptText }] },
    });

    // Run both analyses in parallel for efficiency
    const [competitorResponse, visualResponse] = await Promise.all([
        competitorAnalysisPromise,
        visualStylePromise,
    ]);

    // Send a successful response back to the frontend
    res.status(200).json({
      competitorAnalysisResult: competitorResponse.text,
      visualStylePrompt: visualResponse.text,
    });

  } catch (error) {
    console.error("Error in /api/analyzeTemplate:", error);
    // Send an error response back to the frontend
    res.status(500).json({ error: 'Failed to process template analysis on the server.' });
  }
}
