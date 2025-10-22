
import { GoogleGenAI } from "@google/genai";
import { fileToBase64 } from '../utils/fileUtils';

// fix: Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const textModel = 'gemini-2.5-flash';
// fix: Use a model that supports multimodal input for image analysis.
const visionModel = 'gemini-2.5-flash';

export const analyzeCompetitorVideos = async (links: string[]): Promise<string> => {
    const prompt = `
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

    try {
        // fix: Call the generateContent API with the specified model and prompt.
        const response = await ai.models.generateContent({
            model: textModel,
            contents: prompt,
        });
        // fix: Extract the text response directly from the `text` property.
        return response.text;
    } catch (error) {
        console.error("Error analyzing competitor videos:", error);
        throw new Error("Failed to analyze videos with Gemini API.");
    }
};

export const generateVisualStylePrompt = async (files: File[]): Promise<string> => {
    if (files.length === 0) {
        throw new Error("No files provided for visual style analysis.");
    }

    const imageParts = await Promise.all(
        files.map(async (file) => {
            const base64Data = await fileToBase64(file);
            return {
                inlineData: {
                    mimeType: file.type,
                    data: base64Data,
                },
            };
        })
    );

    const prompt = `
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

    try {
        // fix: Send a multimodal request with both images and a text prompt.
        const response = await ai.models.generateContent({
            model: visionModel,
            contents: { parts: [...imageParts, { text: prompt }] },
        });
        
        // fix: Extract the text response directly from the `text` property.
        return response.text;
    } catch (error) {
        console.error("Error generating visual style prompt:", error);
        throw new Error("Failed to generate visual style prompt with Gemini API.");
    }
};
