import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="w-full fixed top-0 z-50 bg-white/10 backdrop-blur-md shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="text-lg font-bold text-white">URL Shortener</div>
        <div>
          <Link to="/" className="mx-2 text-white hover:underline">
            Home
          </Link>
          <Link to="/admin" className="mx-2 text-white hover:underline">
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
