import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-slate-50 px-4">
      <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
      <p className="text-lg text-slate-600 mb-6">Page not found.</p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
