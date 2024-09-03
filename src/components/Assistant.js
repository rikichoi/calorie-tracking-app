"use client";

import { Button } from "@mui/material";
import { useChat } from "ai/react";
import { Bot, Send, Trash } from "lucide-react";
import { useEffect, useRef } from "react";

import { useCompletion } from "ai/react";

export default function Assistant() {
  const {
    metadata,
    messages,
    input,
    setMessages,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: "/api/chat",
  });

  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="border px-2 pb-2 bg-white rounded-lg shadow-xl flex h-[55vh] flex-col w-full max-w-md pt-5 mx-auto">
      <div
        ref={scrollRef}
        className="h-full mt-3 mb-3 px-3 overflow-y-auto flex gap-3 flex-col"
      >
        {/* {completion} */}
        {messages.length === 0 && (
          <div className="flex flex-col gap-3 pointer-events-none text-center h-full items-center justify-center">
            <Bot className="animate-pulse" />
            <p className="font-semibold">
              Send a message to start the AI chat!
            </p>
            <p>
              You can ask the assistant any question about diet and exercise.
            </p>
            <p className="text-gray-500 tracking-tight">
              Note: The assistant will provide answers that are tailored to your
              own data!
            </p>
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={` "mb-3 flex items-center "
              ${
                m.role === "assistant"
                  ? " me-5 justify-start "
                  : " ms-5 justify-end "
              } `}
          >
            {m.role === "assistant" && <Bot className="mr-2 flex-none" />}
            <div
              className={`" rounded-md border px-3 py-2 "
                ${
                  m.role === "assistant"
                    ? " bg-background "
                    : "bg-foreground text-background "
                }`}
            >
              <p className="text-sm">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2">
            <div className="animate-pulse bg-gray-500 h-3 w-3 rounded-full"></div>
            <div className="animate-pulse bg-gray-500 h-3 w-3 rounded-full"></div>
            <div className="animate-pulse bg-gray-500 h-3 w-3 rounded-full"></div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-1 justify-end bottom-0 w-full max-w-md border-gray-300 rounded "
      >
        <button
          title="Clear chat history"
          type="button"
          className="shrink-0 bottom-0 p-2 border bg-red-500 hover:bg-red-600 transition-all duration-150 border-gray-300 rounded "
          onClick={() => setMessages([])}
        >
          <Trash size={20} className=""></Trash>
        </button>
        <input
          className="bottom-0 w-full max-w-md p-2 border border-gray-300 rounded "
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button
          title="Clear chat history"
          type="submit"
          className="shrink-0 bottom-0 p-2 border bg-slate-900 group hover:bg-white transition-all duration-150 hover:border-slate-900 border-gray-300 rounded shadow-xl"
        >
          <Send
            size={20}
            className="text-white group-hover:text-slate-900"
          ></Send>
        </button>
      </form>
    </div>
  );
}
