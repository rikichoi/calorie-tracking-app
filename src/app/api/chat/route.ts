import { ChatCompletionMessage } from "openai/resources";
import { streamToResponse, StreamingTextResponse, OpenAIStream } from "ai";
import { createOpenAI } from '@ai-sdk/openai';
import { generateText, streamText } from 'ai';

const openai = createOpenAI({
  // custom settings, e.g.
  compatibility: 'strict', // strict mode, enable when using the OpenAI API
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();
  console.log('messages:', messages);

  const systemMessage: ChatCompletionMessage = {
    role: "assistant",
    refusal: "",
    content: "You are an intelligent dietician. I am here to help you with your diet and nutrition questions." + "Your responses wil allways be no more than 20 words. This is absolute and non-negotiable.",
  };


  const textStream = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages: [...messages, systemMessage],
    temperature: 0.1
  });

  // const response = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   stream: true,
  //   messages: [...messages, systemMessage],
  //   temperature:0.1,
  // })

  // const stream = OpenAIStream(response)
  // return new StreamingTextResponse(stream);

  return textStream.toDataStreamResponse();
}
