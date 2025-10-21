
import { GoogleGenAI } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";

// FIX: Per coding guidelines, assume API_KEY is always available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeCompetitors(links: string[]): Promise<string> {
    const model = 'gemini-2.5-flash';

    // Since we cannot fetch YouTube subtitles from the frontend, we simulate the presence of this data.
    const prompt = `
    You are an expert video script analyst. Your task is to analyze the provided video subtitles to understand the video's structure, pace, and tone. Based on your analysis, create a concise summary that can be used as a guideline for generating new, similar video scripts.

    Here are the subtitles from competitor videos (represented by their links: ${links.join(', ')}):

    Video 1 Subtitles (Simulated):
    "// Placeholder for subtitles of video 1. Imagine a script here. It's fast-paced, exciting, and uses lots of questions to engage the viewer. It likely covers tech reviews. //"

    Video 2 Subtitles (Simulated):
    "// Placeholder for subtitles of video 2. This one is more instructional, slower, with a calm and authoritative tone. It breaks down complex topics like coding step-by-step. //"

    Video 3 Subtitles (Simulated):
    "// Placeholder for subtitles of video 3. This is a storytelling video, maybe a travel vlog. It has a clear beginning, middle, and end, with an emotional arc. The tone is personal and reflective. //"

    Please provide a summary of the common patterns and styles. The summary should be a set of rules or a style guide for writing a new script in a similar vein. Structure your output clearly with headings.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error analyzing competitors:", error);
        throw new Error("Failed to get analysis from Gemini API.");
    }
}

export async function analyzeVisuals(files: File[]): Promise<string> {
    const model = 'gemini-2.5-flash';

    const imageParts = await Promise.all(
        files.map(async (file) => {
            const base64Data = await fileToBase64(file);
            return {
                inlineData: {
                    data: base64Data,
                    mimeType: file.type,
                },
            };
        })
    );

    const prompt = `
    You are an expert art director and prompt engineer for generative AI image models. Analyze the following images to understand their collective artistic style, color palette, and overall atmosphere.

    Based on your analysis, generate a single, universal, and highly detailed master prompt. This master prompt should be versatile enough to be combined with a simple subject (e.g., 'a cat sitting on a chair') to generate a new image that perfectly matches the style of the provided examples. 
    
    The prompt should describe elements like:
    - **Artistic Style:** (e.g., cinematic, hyperrealistic, anime, vaporwave, minimalist)
    - **Lighting:** (e.g., dramatic Rembrandt lighting, soft morning light, neon glow)
    - **Composition:** (e.g., rule of thirds, centered, dutch angle)
    - **Color Palette:** (e.g., muted earth tones, vibrant cyberpunk palette, pastel dreamscape)
    - **Atmosphere/Mood:** (e.g., mysterious and foggy, warm and cozy, futuristic and sterile)
    - **Technical Details:** (e.g., shot on 35mm film, shallow depth of field, wide-angle lens)

    Do not describe the specific subjects in the images (like people or objects). Focus ONLY on the stylistic elements to create a reusable prompt.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [...imageParts, { text: prompt }] },
        });

        return response.text;
    } catch (error) {
        console.error("Error analyzing visuals:", error);
        throw new Error("Failed to get visual prompt from Gemini API.");
    }
}
