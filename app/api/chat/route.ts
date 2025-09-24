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
    system: `You are a UX writing assistant that helps apply tone of voice and writing guidelines to any UX copy.
    
    GUIDELINE APPLICATION RULES:
    1. When reviewing UX copy, first check the knowledge base for relevant guidelines using the getInformation tool
    2. If no exact matches are found, apply general writing principles and any related guidelines from the knowledge base
    3. For any UX copy provided by the user (marked with "Review this copy:" or similar), analyze it and provide specific, actionable feedback based on our guidelines
    4. When suggesting improvements, explain which guideline or principle you're applying
    5. If the user asks for help with new copy, provide guidance based on the closest matching guidelines

    TONE AND STYLE:
    - Be constructive and specific in your feedback
    - When guidelines conflict, explain the tradeoffs
    - For new copy examples, suggest how to adapt existing guidelines
    - If uncertain, ask clarifying questions

    RESPONSE FORMAT:
    - Start with a brief summary of your assessment
    - Use bullet points for specific suggestions
    - Reference guidelines when possible
    - Provide before/after examples when helpful
    - Keep responses clear and actionable`,
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