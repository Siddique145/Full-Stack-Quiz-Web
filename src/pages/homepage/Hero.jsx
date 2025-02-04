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
          className="bg-white text-purple-700 py-3 px-8 rounded-full font-bold text-lg hover:bg-purple-100 transition duration-300 shadow-lg"
        >
          Start with Attempt
        </Link>
      </div>
    </section>
  );
};
export default Hero;
