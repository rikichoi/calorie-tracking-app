import { ChatCompletionMessage } from "openai/resources";
import { createOpenAI } from '@ai-sdk/openai';
import { LangChainAdapter, LangChainStream, streamText } from 'ai';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { getVectorStore } from "@/lib/astradb";
import { NextRequest, NextResponse } from "next/server";

const openai = createOpenAI({
  // custom settings, e.g.
  compatibility: 'strict', // strict mode, enable when using the OpenAI API
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest, res:NextResponse) {
  const body = await req.json();
  const messages = body.messages ?? [];
  const currentMessageContent = messages[messages.length - 1].content;

  const model = new ChatOpenAI({
    model: 'gpt-3.5-turbo-0125',
    temperature: 0,
    streaming: true,
    callbacks: []
  });

  const promptTemplate = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are an intelligent dietician." + "Your responses wil allways be no more than 20 words.\n\n"

    ],
    ["user", "{input}"],
  ]);
  // +
  // "Context:\n{context}",
  const chain = promptTemplate.pipe(model)
  // chain.invoke({ input: currentMessage })

  const stream = await chain.stream({ input: currentMessageContent })
  console.log(stream)
  return LangChainAdapter.toDataStreamResponse(stream);
  // return NextResponse.json(stream, { status: 200 });
}