import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const RegistrationAlert = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 w-5/6 md:w-1/2 bg-purple-100 text-purple-800 px-6 py-4 rounded-lg shadow-lg flex items-center justify-between transition-opacity duration-500">
      <span className="text-lg font-semibold">🚀 Welcome! Register now Hurry up <b>"Signup"</b></span>
      <button onClick={handleClose} className="text-purple-600 hover:text-purple-900 transition">
        <FaTimes className="text-xl" />
      </button>
    </div>
  );
};

export default RegistrationAlert;
