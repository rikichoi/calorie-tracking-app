import React from "react";

export default function Modal({ show, onClose, children }) {
  return (
    <div>
      <div
        style={{ transform: show ? "translateX(0%)" : "translateX(-200%)" }}
        className="absolute top-0 left-0 h-full w-full z-50 backdrop-blur-md transition-all duration-300"
      >
        <div className="container bg-slate-300 border-2 border-black mx-auto max-w-2xl h-[80vh] rounded-3xl mt-12">
          <div className="w-full flex flex-row justify-end p-4">
            <button
              onClick={() => onClose(!show)}
              className="w-10 h-10 rounded-full bg-red-700 border-gray-600 border-2 text-white font-bold"
            >
              X
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
