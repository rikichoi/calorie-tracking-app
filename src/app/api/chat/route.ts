import { ChatCompletionMessage } from "openai/resources";
import { createOpenAI } from '@ai-sdk/openai';
import { LangChainAdapter, LangChainStream, streamText } from 'ai';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { getVectorStore } from "@/lib/astradb.mjs";
import { NextRequest, NextResponse } from "next/server";
import type { AIMessageChunk } from "@langchain/core/messages";

const openai = createOpenAI({
  // custom settings, e.g.
  compatibility: 'strict', // strict mode, enable when using the OpenAI API
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const messages = body.messages ?? [];
  const currentMessageContent = messages[messages.length - 1].content;

  const model = new ChatOpenAI({
    model: 'gpt-3.5-turbo-0125',
    temperature: 0,
    streaming: true,
    callbacks: [],
    verbose: true
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are an intelligent dietician that has a plethra of knowledge about building supplies." + "Your responses wil allways be no more than 20 words.\n\n"
      +
      "Context:\n{context}",
    ],
    ["user", "{input}"],
  ]);

  const combineDocsChain = await createStuffDocumentsChain({
    llm: model,
    prompt,
  });

  const retriever = (await getVectorStore()).asRetriever();

  const retrievalChain = await createRetrievalChain({
    retriever,
    combineDocsChain,
  });

  // chain.invoke({ input: currentMessage })
  // const customHandler = {
  //   handleChatModelStart: async (llm, inputMessages, runId) => {
  //     console.log("Chat model start:", llm, inputMessages, runId);
  //   },
  //   handleLLMNewToken: async (token) => {
  //     console.log("Chat model new token", token);
  //   },
  // };


  const stream = await retrievalChain.stream({ input: currentMessageContent })

  const eventStream = await retrievalChain.streamEvents(
    { input: currentMessageContent },
    { version: "v2" }
  );

  return LangChainAdapter.toDataStreamResponse(eventStream);
}