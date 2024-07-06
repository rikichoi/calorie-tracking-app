import React from "react";

export default function Modal({ show, onClose, clearModalFunction, children }) {
  return (
    <div>
      <div
        style={{ transform: show ? "translateX(0%)" : "translateX(-200%)" }}
        className="absolute top-0 left-0 h-full w-full z-50 backdrop-blur-md transition-all duration-300"
      >
        <div className="container overflow-scroll bg-[#78ABA8] border-2 border-black mx-auto max-w-2xl h-[83vh] rounded-3xl mt-12">
          {children}
        </div>
      </div>
    </div>
  );
}
