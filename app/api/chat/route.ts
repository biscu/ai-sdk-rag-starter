import { createResource } from '@/lib/actions/resources';
import { openai } from '@ai-sdk/openai';
import {
  convertToModelMessages,
  streamText,
  tool,
  UIMessage,
  stepCountIs,
} from 'ai';
import { z } from 'zod';
import { findRelevantContent } from '@/lib/ai/embedding';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4o', {
      temperature: 0.3, // Lower temperature for more focused and deterministic responses
      topP: 0.9, // Controls diversity of responses
      frequencyPenalty: 0.5, // Reduces repetition
      presencePenalty: 0.5, // Encourages more diverse topics
      maxTokens: 1000, // Limit response length
    }),
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    system: `You are a helpful assistant specialized in UX copywriting and tone of voice guidelines.
    
    RULES:
    1. Always check the knowledge base using the getInformation tool before responding
    2. If the knowledge base contains relevant information, use it to provide a concise, accurate response
    3. If no relevant information is found, respond with: "I couldn't find specific information about this in our guidelines. Would you like me to connect you with the UX writing team for more details?"
    4. Only answer questions related to UX copy, writing, or tone of voice
    5. Be professional, clear, and concise in your responses
    6. If the user asks about something outside your knowledge domain, politely explain that you specialize in UX writing topics
    
    RESPONSE FORMAT:
    - Use bullet points for lists
    - Keep responses focused and to the point
    - Reference specific guidelines when possible`,
    tools: {
      addResource: tool({
        description: `Add a new resource to the knowledge base. Only use this when explicitly asked to add new information.`,
        inputSchema: z.object({
          content: z.string().describe('The content to add to the knowledge base')
        }),
        execute: async ({ content }) => createResource({ content }),
      }),
      getInformation: tool({
        description: `Search the knowledge base for relevant information. Always use this before answering questions.`,
        inputSchema: z.object({
          question: z.string().describe('The user\'s question to search for')
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}