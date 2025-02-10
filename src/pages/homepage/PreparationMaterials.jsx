import React from "react";
import { FaBook, FaFilePdf, FaVideo, FaRegLightbulb } from "react-icons/fa";

const materials = [
  { id: 1, title: "Complete Biology Notes", type: "PDF", icon: <FaFilePdf /> },
  { id: 2, title: "Physics Conceptual Videos", type: "Video", icon: <FaVideo /> },
  { id: 3, title: "High-Yield Chemistry Questions", type: "PDF", icon: <FaFilePdf /> },
  { id: 4, title: "Exclusive MDCAT Tips", type: "Article", icon: <FaRegLightbulb /> },
  { id: 5, title: "MCQs Practice Workbook", type: "Book", icon: <FaBook /> },
];

const PreparationMaterial = () => {
  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-2">MDCAT Preparation Material</h2>
        <p className="text-lg text-gray-600 mb-8">Get access to high-quality study material curated by experts.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {materials.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-purple-100 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <div className="text-purple-700 text-4xl mb-3">{item.icon}</div>
            <h3 className="text-xl font-semibold text-purple-800">{item.title}</h3>
            <span className="text-sm text-gray-600 mt-1">{item.type} Format</span>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-purple-800 transition">
          Explore More Materials
        </button>
      </div>
    </div>
  );
};

export default PreparationMaterial;
