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
    <div className="border-2 border-[#f54748] rounded-lg shadow-xl flex h-[50vh] flex-col w-full max-w-md pt-5 mx-auto">
      <div ref={scrollRef} className="h-full mt-3 px-3 overflow-y-auto flex gap-3 flex-col">
        {/* {completion} */}
        {messages.map((m) => (
          <div
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
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-1 justify-end bottom-0 w-full max-w-md border-gray-300 rounded shadow-xl"
      >
        <button
          title="Clear chat history"
          type="button"
          className="shrink-0 bottom-0 p-2 border bg-red-500 border-gray-300 rounded shadow-xl"
          onClick={() => setMessages([])}
        >
          <Trash size={20} className=""></Trash>
        </button>
        <input
          className="bottom-0 w-full max-w-md p-2 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button
          title="Clear chat history"
          type="submit"
          className="shrink-0 bottom-0 p-2 border bg-slate-900 border-gray-300 rounded shadow-xl"
        >
          <Send size={20} className="text-white"></Send>
        </button>
      </form>
    </div>
  );
}
