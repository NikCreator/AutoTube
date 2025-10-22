import { fileToBase64 } from '../utils/fileUtils';

// This function now securely communicates with OUR OWN backend on Vercel,
// not directly with the Google Gemini API.
export const analyzeTemplateOnServer = async (links: string[], files: File[]): Promise<{ competitorAnalysisResult: string, visualStylePrompt: string }> => {
    
    // Convert files to base64 to send them as JSON to our backend
    const filePayloads = await Promise.all(
      files.map(async file => ({
        base64: await fileToBase64(file),
        type: file.type
      }))
    );
    
    // Send the data to our secure Vercel Serverless Function
    const response = await fetch('/api/analyzeTemplate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            links,
            files: filePayloads,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        // Propagate the server error to the UI
        throw new Error(errorData.error || "An unknown error occurred on the server.");
    }

    // Return the analysis results from our backend
    return response.json();
};
