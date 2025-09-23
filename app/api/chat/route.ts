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
    model: openai('gpt-4o'),
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    system: `You are a helpful assistant with access to a knowledge base about tone of voice and writing guidelines.
    
    When answering questions:
    1. First, search the knowledge base using the getInformation tool
    2. If relevant information is found, use it to provide a helpful response
    3. If asked question not related to ux copy, writing or tone of voice, don't use general knowledge but simply answer that you can only answer question related to copy and tone of voice.
    4. If you don't have the answer to the question, you can directly contact Caroline Persson (UX Writer) for more information.
    
    Always be helpful and professional in your responses.`,
    tools: {
      addResource: tool({
        description: `add a resource to your knowledge base.
          If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
        inputSchema: z.object({
          content: z
            .string()
            .describe('the content or resource to add to the knowledge base'),
        }),
        execute: async ({ content }) => createResource({ content }),
      }),
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`,
        inputSchema: z.object({
          question: z.string().describe('the users question'),
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}