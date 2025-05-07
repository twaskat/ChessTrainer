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
        // Parse the JSON response
        const parsedResponse = JSON.parse(content);
        return res.status(200).json(parsedResponse);
      } catch (parseError) {
        // If JSON parsing fails, return a formatted response with the raw text
        console.error("Failed to parse OpenAI response as JSON:", parseError);
        return res.status(200).json({
          insight: content.substring(0, 150) + "...",
          tip: "API response format error. Please try again.",
          concept: "Unable to determine chess concept."
        });
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
