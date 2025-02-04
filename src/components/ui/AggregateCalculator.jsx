

// import React from "react";
// import { useState } from "react";
// const AggregateCalculator = () => {
//   const [marks, setMarks] = useState({
//     matric: "",
//     fsc: "",
//     mdcat: "",
//   });
//   const [aggregate, setAggregate] = useState(null);


//   const handleChange = (e) => {
//     setMarks({ ...marks, [e.target.name]: e.target.value });
//   };

//   const calculateAggregate = () => {
//     const matric = Number.parseFloat(marks.matric);
//     const fsc = Number.parseFloat(marks.fsc);
//     const mdcat = Number.parseFloat(marks.mdcat);

//     if (isNaN(matric) || isNaN(fsc) || isNaN(mdcat)) {
//       alert("Please enter valid marks");
//       return;
//     }

//     const totalAggregate = (matric / 1100) * 10 + (fsc / 1100) * 40 + (mdcat / 200) * 50;
//     setAggregate(Number.parseFloat(totalAggregate.toFixed(2)));
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">MDCAT Aggregate Calculator</h2>
//       <div className="space-y-4">
//         {["matric", "fsc", "mdcat"].map((field, index) => (
//           <div key={index}>
//             <label htmlFor={field} className="block text-sm font-medium text-gray-700">
//               {field === "matric"
//                 ? "Matric Marks (out of 1100)"
//                 : field === "fsc"
//                 ? "FSc Marks (out of 1100)"
//                 : "MDCAT Marks (out of 200)"}
//             </label>
//             <input
//               type="number"
//               id={field}
//               name={field}
//               value={marks[field]}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
//             />
//           </div>
//         ))}
//         <button
//           onClick={calculateAggregate}
//           className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
//         >
//           Calculate Aggregate
//         </button>
//         {aggregate !== null && (
//           <div className="mt-4 text-center">
//             <p className="text-lg font-semibold">Your Aggregate:</p>
//             <p className="text-3xl font-bold text-primary-600">{aggregate}%</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AggregateCalculator;



import React, { useState } from "react";

const AggregateCalculator = () => {
  const [marks, setMarks] = useState({
    matric: "",
    fsc: "",
    mdcat: "",
  });
  const [aggregate, setAggregate] = useState(null);

  const handleChange = (e) => {
    setMarks({ ...marks, [e.target.name]: e.target.value });
  };

  const calculateAggregate = () => {
    const matric = Number.parseFloat(marks.matric);
    const fsc = Number.parseFloat(marks.fsc);
    const mdcat = Number.parseFloat(marks.mdcat);

    if (isNaN(matric) || isNaN(fsc) || isNaN(mdcat)) {
      alert("Please enter valid marks");
      return;
    }

    const totalAggregate = (matric / 1100) * 10 + (fsc / 1100) * 40 + (mdcat / 200) * 50;
    setAggregate(Number.parseFloat(totalAggregate.toFixed(2)));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-purple-300">
      <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">
        MDCAT Aggregate Calculator
      </h2>
      <div className="space-y-4">
        {["matric", "fsc", "mdcat"].map((field, index) => (
          <div key={index}>
            <label htmlFor={field} className="block text-sm font-medium text-purple-700">
              {field === "matric"
                ? "Matric Marks (out of 1100)"
                : field === "fsc"
                ? "FSc Marks (out of 1100)"
                : "MDCAT Marks (out of 200)"}
            </label>
            <input
              type="number"
              id={field}
              name={field}
              value={marks[field]}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-purple-500 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300  p-2"
            />
          </div>
        ))}
        <button
          onClick={calculateAggregate}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
        >
          Calculate Aggregate
        </button>
        {aggregate !== null && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-gray-700">Your Aggregate:</p>
            <p className="text-3xl font-bold text-purple-600">{aggregate}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AggregateCalculator;
