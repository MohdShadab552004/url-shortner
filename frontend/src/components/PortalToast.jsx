// src/components/ToastPortal.jsx
import React from "react";
import ReactDOM from "react-dom";

const ToastPortal = ({ show, message }) => {
  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-lg shadow-lg">
        <span className="text-green-600">✔️</span>
        <span className="font-medium">{message}</span>
      </div>
    </div>,
    document.body
  );
};

export default ToastPortal;
