"use client";

import { Button } from "@mui/material";
import { useChat } from "ai/react";
import { Send, Trash } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Assistant() {
  const { messages, input, setMessages, handleInputChange, handleSubmit } =
    useChat({
      api: "/api/chat",
    });

  const inputRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="border-2 border-[#f54748] rounded-lg shadow-xl flex h-[75vh] flex-col w-full max-w-md py-5 mx-auto stretch">
      <div
        className="h-full mt-3 px-3 overflow-y-auto flex gap-3 flex-col"
        ref={scrollRef}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`${
              m.role === "user" ? " justify-start " : " justify-end "
            } flex whitespace-pre-wrap`}
          >
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}{" "}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-1  fixed bottom-0 w-full max-w-md mb-8 border-gray-300 rounded shadow-xl"
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
          ref={inputRef}
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
