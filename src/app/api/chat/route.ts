import { ChatCompletionMessage } from "openai/resources";
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const openai = createOpenAI({
  // custom settings, e.g.
  compatibility: 'strict', // strict mode, enable when using the OpenAI API
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();
  console.log('messages:', messages);

  // This system message is optional, but it is a good practice to include it in the messages array.
  // We can also just type this system message out within the messages array.
  const systemMessage: ChatCompletionMessage = {
    role: "assistant",
    refusal: "",
    content: "You are an intelligent dietician." + "Your responses wil allways be no more than 20 words.",
  };


  const textStream = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages: [...messages, systemMessage],
    temperature: 0.1
  });
  return textStream.toDataStreamResponse();
}
