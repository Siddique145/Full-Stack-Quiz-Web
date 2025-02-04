// // // import React from "react";
// // // import { NavLink } from "react-router-dom";
// // // import { Home, BookOpen, FileText, Calculator, Settings } from "lucide-react";

// // // const Sidebar = () => {
// // //   return (
// // //     <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
// // //       <nav className="space-y-2">
// // //         <NavLink
// // //           to="/"
// // //           className={({ isActive }) =>
// // //             `flex items-center space-x-2 p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
// // //           }
// // //         >
// // //           <Home size={20} />
// // //           <span>Dashboard</span>
// // //         </NavLink>
// // //         <NavLink
// // //           to="/study"
// // //           className={({ isActive }) =>
// // //             `flex items-center space-x-2 p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
// // //           }
// // //         >
// // //           <BookOpen size={20} />
// // //           <span>Study Material</span>
// // //         </NavLink>
// // //         <NavLink
// // //           to="/tests"
// // //           className={({ isActive }) =>
// // //             `flex items-center space-x-2 p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
// // //           }
// // //         >
// // //           <FileText size={20} />
// // //           <span>MCQ Tests</span>
// // //         </NavLink>
// // //         <NavLink
// // //           to="/calculator"
// // //           className={({ isActive }) =>
// // //             `flex items-center space-x-2 p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
// // //           }
// // //         >
// // //           <Calculator size={20} />
// // //           <span>Aggregate Calculator</span>
// // //         </NavLink>
// // //         <NavLink
// // //           to="/settings"
// // //           className={({ isActive }) =>
// // //             `flex items-center space-x-2 p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
// // //           }
// // //         >
// // //           <Settings size={20} />
// // //           <span>Settings</span>
// // //         </NavLink>
// // //       </nav>
// // //     </aside>
// // //   );
// // // };

// // // export default Sidebar;


// // import React from "react";
// // import { NavLink } from "react-router-dom";
// // import { Home, BookOpen, FileText, Calculator, Settings } from "lucide-react";

// // const Sidebar = () => {
// //   return (
// //     <aside className="bg-purple-700 text-white w-64 min-h-screen p-4">
// //       <nav className="space-y-2">
// //         {[
// //           { to: "/", label: "Dashboard", icon: <Home size={20} /> },
// //           { to: "/study", label: "Study Material", icon: <BookOpen size={20} /> },
// //           { to: "/tests", label: "MCQ Tests", icon: <FileText size={20} /> },
// //           { to: "/calculator", label: "Aggregate Calculator", icon: <Calculator size={20} /> },
// //           { to: "/settings", label: "Settings", icon: <Settings size={20} /> },
// //         ].map(({ to, label, icon }) => (
// //           <NavLink
// //             key={to}
// //             to={to}
// //             className={({ isActive }) =>
// //               `flex items-center space-x-2 p-2 rounded transition ${
// //                 isActive ? "bg-purple-900" : "hover:bg-purple-800"
// //               }`
// //             }
// //           >
// //             {icon}
// //             <span>{label}</span>
// //           </NavLink>
// //         ))}
// //       </nav>
// //     </aside>
// //   );
// // };

// // export default Sidebar;
// import React from "react";
// import { NavLink } from "react-router-dom";
// import { Home, BookOpen, FileText, Calculator, Settings } from "lucide-react";

// const Sidebar = () => {
//   return (
//     <aside className="bg-purple-700 text-white w-64 min-h-screen p-4">
//       <nav className="space-y-2">
//         {[
//           { to: "/", label: "Dashboard", icon: <Home size={20} /> },
//           { to: "/study", label: "Study Material", icon: <BookOpen size={20} /> },
//           { to: "/tests", label: "MCQ Tests", icon: <FileText size={20} /> },
//           { to: "/calculator", label: "Aggregate Calculator", icon: <Calculator size={20} /> },
//           { to: "/settings", label: "Settings", icon: <Settings size={20} /> },
//         ].map(({ to, label, icon }) => (
//           <NavLink
//             key={to}
//             to={to}
//             className={({ isActive }) =>
//               `flex items-center space-x-2 p-2 rounded transition ${
//                 isActive ? "bg-purple-900" : "hover:bg-purple-800"
//               }`
//             }
//           >
//             {icon}
//             <span>{label}</span>
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
