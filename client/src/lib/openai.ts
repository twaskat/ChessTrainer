import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage
});

export interface AIInsightRequest {
  fen: string;        // FEN string representing the chess position
  move?: string;      // The move that was just made (optional)
  notation?: string;  // Algebraic notation of the move (optional)
  previousMove?: string; // Previous move in the sequence (optional)
  difficulty: 'beginner' | 'intermediate' | 'advanced'; // User skill level
}

export interface AIInsightResponse {
  insight: string;   // Main insight about the current position or move
  tip: string;       // Practical tip for the player
  concept: string;   // Chess concept being demonstrated
  error?: string;    // Error message if API call fails
}

/**
 * Generates chess insights using OpenAI API for a given position and move
 */
export async function generateChessInsight(
  request: AIInsightRequest
): Promise<AIInsightResponse> {
  try {
    const { fen, move, notation, previousMove, difficulty } = request;
    
    // Construct the prompt for the OpenAI API
    const prompt = `
You are a helpful chess coach providing insights about chess positions and moves.
Current position (FEN): ${fen}
${move ? `Move just played: ${move}` : ''}
${notation ? `Move notation: ${notation}` : ''}
${previousMove ? `Previous move: ${previousMove}` : ''}
Player skill level: ${difficulty}

Please provide:
1. An insightful explanation about this position or move in 2-3 sentences.
2. A practical tip for the player based on this position in 1-2 sentences.
3. A brief mention of the chess concept being demonstrated (opening principle, tactic, etc.) in 1 sentence.

Format your response as JSON with the keys: "insight", "tip", and "concept". Keep your explanations clear, concise, and appropriate for a ${difficulty} player.
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
      return {
        insight: parsedResponse.insight || "No insight available.",
        tip: parsedResponse.tip || "No tip available.",
        concept: parsedResponse.concept || "No concept information available."
      };
    } catch (parseError) {
      // If JSON parsing fails, return a formatted response with the raw text
      console.error("Failed to parse OpenAI response as JSON:", parseError);
      return {
        insight: content.substring(0, 100) + "...",
        tip: "API response format error. Please try again.",
        concept: "Unable to determine chess concept.",
        error: "Response format error"
      };
    }
    
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    return {
      insight: "Unable to generate insight at this time.",
      tip: "Please try again later or continue with the tutorial.",
      concept: "Error occurred.",
      error: error.message || "Unknown error"
    };
  }
}