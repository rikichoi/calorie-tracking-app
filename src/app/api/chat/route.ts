import { ChatCompletionMessage } from "openai/resources";
import { createOpenAI } from '@ai-sdk/openai';
import { LangChainAdapter, LangChainStream, StreamingTextResponse, streamText, Message as VercelChatMessage } from 'ai';
import { ChatPromptTemplate, PromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { getVectorStore } from "@/lib/astradb.mjs";
import { NextRequest, NextResponse } from "next/server";
import type { AIMessageChunk } from "@langchain/core/messages";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

const openai = createOpenAI({
  // custom settings, e.g.
  compatibility: 'strict', // strict mode, enable when using the OpenAI API
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages ?? [];

  const chatHistory = messages.slice(0, -1).map((message: VercelChatMessage) => message.role === "user" ? new HumanMessage(message.content) : new AIMessage(message.content));
  const currentMessageContent = messages[messages.length - 1].content;


  const model = new ChatOpenAI({
    model: 'gpt-3.5-turbo-0125',
    streaming: true,
    verbose: true,
    temperature: 0.1
  });

  const rephrasingModel = new ChatOpenAI({
    model: 'gpt-3.5-turbo-0125',
    streaming: false,
    verbose: true,
    temperature: 0.1
  });

  const retriever = (await getVectorStore()).asRetriever();

  const rephrasePrompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("chat_history"),
    ["user", "{input}"],
    [
      "user",
      "Given the above conversation, generate a search query to look up in order to get information relevant to the current question. " +
      "Don't leave out any relevant keywords. Only return the query and no other text.",
    ],
  ]);

  const historyAwareRetrieverChain = await createHistoryAwareRetriever({
    llm: rephrasingModel,
    retriever,
    rephrasePrompt,
  });


  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are an intelligent tradesman, experiences, and professional.m\n" +
      "You have access to an extensive database, containing information from PDFs regarding tools that the user may query you on.\n" +
      "Your responses wil allways be no more than 100 words. This is non-negotiable. No exceptions.\n\n" +
      "Context:\n{context}",
    ],
    new MessagesPlaceholder("chat_history"),
    ["user", "{input}"],
  ]);

  const combineDocsChain = await createStuffDocumentsChain({
    llm: model,
    prompt,
    documentPrompt: PromptTemplate.fromTemplate("Page URL: {url}\n{page_content}"),
    documentSeparator: "\n--------\n",
  });

  const retrievalChain = await createRetrievalChain({
    combineDocsChain,
    retriever: historyAwareRetrieverChain,
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


  // const stream = await retrievalChain.stream({ input: currentMessageContent })
  // const rephrasedQuery = await historyAwareRetrieverChain.invoke({
  //   input: currentMessageContent,
  //   chat_history: chatHistory,
  // });

  // const finalResponse = await retrievalChain.invoke({
  //   input: currentMessageContent,
  //   chat_history: chatHistory,
  // });

  const eventStream = retrievalChain.streamEvents(
    {
      input: currentMessageContent,

    },
    { version: "v2" },
  );

  return LangChainAdapter.toDataStreamResponse(eventStream);
}