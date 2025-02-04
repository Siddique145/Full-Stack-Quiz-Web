// import React from "react";

// const StatsCard = ({ title, value, icon }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
//       <div className="p-3 bg-primary-100 rounded-full">{icon}</div>
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//         <p className="text-2xl font-bold text-primary-600">{value}</p>
//       </div>
//     </div>
//   );
// };

// export default StatsCard;
import React from "react";

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 border-l-4 border-purple-500">
      <div className="p-3 bg-purple-100 rounded-full">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-purple-700">{title}</h3>
        <p className="text-2xl font-bold text-purple-800">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
