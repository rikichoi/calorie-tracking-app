"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export default function Assistant() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
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
    <div className="border-2 flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="h-full mt-3 px-3 overflow-y-auto" ref={scrollRef}>
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}{" "}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          ref={inputRef}
        />
      </form>
    </div>
  );
}
