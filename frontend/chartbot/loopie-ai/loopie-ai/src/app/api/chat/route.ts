import OpenAI from "openai";

export const runtime = "edge";

// Initialize the OpenAI client pointing to Grok's (xAI) base URL
const client = new OpenAI({
  apiKey: process.env.XAI_API_KEY, // Ensure you have this in your environment variables
  baseURL: "https://api.xai.com/v1",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const stream = await client.chat.completions.create({
    model: "grok-2-latest", // or "grok-beta"
    max_tokens: 1024,
    // Grok uses the OpenAI format where the system prompt is the first message
    messages: [
      {
        role: "system",
        content: `You are Loopie, a calm, thoughtful, and precise AI assistant. 
Your personality: warm but not effusive, honest, concise, and genuinely helpful.
Format: Use markdown sparingly — bold for key terms, backticks for code, numbered lists when steps matter. 
Keep responses clear and focused. Never pad with filler phrases.`,
      },
      ...messages,
    ],
    stream: true,
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        // Extract the text delta from the OpenAI-compatible chunk
        const text = chunk.choices[0]?.delta?.content || "";
        
        if (text) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
          );
        }
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
