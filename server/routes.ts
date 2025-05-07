import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from 'openai';

// Initialize OpenAI client with server-side API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Chess insights endpoint using OpenAI
  app.post('/api/chess/insights', async (req: Request, res: Response) => {
    try {
      const { fen, move, notation, previousMove, difficulty } = req.body;
      
      if (!fen) {
        return res.status(400).json({ 
          error: 'FEN string is required' 
        });
      }
      
      // Construct the prompt for the OpenAI API
      const prompt = `
You are a helpful chess coach providing insights about chess positions and moves.
Current position (FEN): ${fen}
${move ? `Move just played: ${move}` : ''}
${notation ? `Move notation: ${notation}` : ''}
${previousMove ? `Previous move: ${previousMove}` : ''}
Player skill level: ${difficulty || 'beginner'}

Please provide:
1. An insightful explanation about this position or move in 2-3 sentences.
2. A practical tip for the player based on this position in 1-2 sentences.
3. A brief mention of the chess concept being demonstrated (opening principle, tactic, etc.) in 1 sentence.

Format your response as JSON with the keys: "insight", "tip", and "concept". Keep your explanations clear, concise, and appropriate for the player's skill level.
`;

      // Call the OpenAI API
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful chess coach." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 300,
      });

      // Extract the content from the response
      const content = response.choices[0]?.message?.content || '';
      
      try {
        // Clean up the response if it contains markdown code blocks
        let cleanedContent = content;
        
        // Remove markdown code fences if present
        if (cleanedContent.includes("```json")) {
          cleanedContent = cleanedContent.replace(/```json\n|\n```/g, "");
        } else if (cleanedContent.includes("```")) {
          cleanedContent = cleanedContent.replace(/```\n|\n```/g, "");
        }
        
        // Try to parse the result as JSON
        const parsedResponse = JSON.parse(cleanedContent);
        return res.status(200).json(parsedResponse);
      } catch (parseError) {
        // If JSON parsing fails, extract insight, tip, concept using regex
        console.error("Failed to parse OpenAI response as JSON:", parseError);
        
        // Create a fallback response
        const fallbackResponse = {
          insight: "Unable to parse AI response properly.",
          tip: "Please continue with the tutorial as provided.",
          concept: "Chess position analysis."
        };
        
        // Try to extract insight using regex
        const insightMatch = content.match(/\"insight\":\s*\"([^\"]+)/);
        if (insightMatch && insightMatch[1]) {
          fallbackResponse.insight = insightMatch[1];
        }
        
        // Try to extract tip using regex
        const tipMatch = content.match(/\"tip\":\s*\"([^\"]+)/);
        if (tipMatch && tipMatch[1]) {
          fallbackResponse.tip = tipMatch[1];
        }
        
        // Try to extract concept using regex
        const conceptMatch = content.match(/\"concept\":\s*\"([^\"]+)/);
        if (conceptMatch && conceptMatch[1]) {
          fallbackResponse.concept = conceptMatch[1];
        }
        
        return res.status(200).json(fallbackResponse);
      }
      
    } catch (error: any) {
      console.error("OpenAI API Error:", error);
      return res.status(500).json({ 
        error: error.message || 'An error occurred while generating insights',
        insight: "Unable to generate insight at this time.",
        tip: "Please try again later or continue with the tutorial.",
        concept: "Error occurred."
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
