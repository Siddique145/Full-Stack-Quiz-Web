import React from "react";
const About = () => {
    return (
      <section id="about" className="py-20 bg-white border-t-2 border-purple-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">About MDCAT Prep</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-600">Our Mission</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                At <span className="font-bold text-purple-700">MDCAT Prep</span>, we're committed to helping aspiring medical students achieve their dreams.
                Our comprehensive preparation platform gives you the tools, knowledge, and confidence you need
                to excel in the Medical and Dental College Admission Test.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-600">Why Choose Us?</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><span className="text-purple-700 font-medium">Comprehensive</span> study materials covering all MDCAT subjects</li>
                <li><span className="text-purple-700 font-medium">Adaptive learning</span> technology to personalize your study plan</li>
                <li><span className="text-purple-700 font-medium">Thousands</span> of practice questions and full-length mock tests</li>
                <li><span className="text-purple-700 font-medium">Detailed performance</span> analytics to track your progress</li>
                <li><span className="text-purple-700 font-medium">Expert-led</span> video lectures and tutorials</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;
  