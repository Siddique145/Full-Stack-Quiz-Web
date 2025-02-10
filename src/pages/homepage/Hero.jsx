import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-purple-700 text-white py-20">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Ace Your <span className="text-purple-300">MDCAT</span> with Confidence
        </h1>
        <p className="text-xl mb-8 text-purple-200">
          Comprehensive preparation materials, practice tests, and personalized study plans.
        </p>
        <Link
          to="/login"
          className="relative inline-block bg-white text-purple-700 py-4 px-8 rounded-full font-bold text-lg border-6 border-white transition-all duration-300 
          hover:bg-purple-600 hover:border-white hover:text-white hover:scale-110 
          shadow-[0_8px_0px_#4B0082] hover:shadow-[0_12px_0px_#4B0082] animate-bounce"
        >
          Click me to Start First Attempt
        </Link>
      </div>
    </section>
  );
};

export default Hero;
