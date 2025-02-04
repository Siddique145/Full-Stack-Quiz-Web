import React, { useState } from "react";
import {  User, Menu } from "lucide-react";
import { useNavigate } from "react-router";

const TopHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-purple-700">
          MDCAT Prep
        </a>
        <nav className="hidden md:flex space-x-4">
          {["Home", "About", "Contact"].map((item, index) => (
            <a 
              key={index} 
              href={item === "Home"? "/" : `home#${item.toLowerCase()}`} 
              className="text-gray-700 hover:text-purple-600 transition"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-purple-600 transition"
            onClick={() => navigate("/login")}>
          </button>
          <div className="hidden md:flex items-center space-x-2">
            {/* <User size={20} className="text-purple-700" /> */}
          </div>
          <button 
            className="md:hidden text-gray-700 hover:text-purple-600 transition" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden mt-4 space-y-2 bg-purple-100 p-4 rounded-lg">
          {["Home", "About", "Contact"].map((item, index) => (
            <a 
              key={index} 
              href={item === "Home" ? "/" : `#${item.toLowerCase()}`} 
              className="block text-gray-700 hover:text-purple-600 transition"
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default TopHeader;
