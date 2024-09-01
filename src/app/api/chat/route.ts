import { ChatCompletionMessage } from "openai/resources";
import openai from "../../../lib/openai";
import { streamText, convertToCoreMessages ,StreamingTextResponse, OpenAIStream } from "ai";


export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemMessage: ChatCompletionMessage = {
    role: "assistant",
    refusal: "",
    content: "You are an intelligent dietician. I am here to help you with your diet and nutrition questions.",};

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [...messages, systemMessage],
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream);
}
