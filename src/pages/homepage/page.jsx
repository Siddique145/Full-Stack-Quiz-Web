// import React from "react"
// import Sidebar from "../../components/ui/Sidebar"
// import Header from "../../components/ui/Header"
// import StatsCard from "../../components/ui/StatsCard"
// // import RecentTests from "./components/RecentTests"
// import AggregateCalculator from "../../components/ui/AggregateCalculator"
// import { BookOpen, CheckCircle, Clock, TrendingUp } from "lucide-react"

// export default function Home() {
//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       <Sidebar />
//       <div className="flex-1">
//         <Header />
//         <main className="p-6">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//             <StatsCard title="Total Study Hours" value={120} icon={<Clock className="text-primary-600" size={24} />} />
//             <StatsCard
//               title="Completed MCQs"
//               value={1500}
//               icon={<CheckCircle className="text-primary-600" size={24} />}
//             />
//             <StatsCard title="Average Score" value="78%" icon={<TrendingUp className="text-primary-600" size={24} />} />
//             <StatsCard title="Subjects Covered" value={5} icon={<BookOpen className="text-primary-600" size={24} />} />
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* <RecentTests /> */}
//             <AggregateCalculator />
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

import React from "react";
import Sidebar from "../../components/ui/Sidebar";
import Header from "../../components/ui/Header";
import StatsCard from "../../components/ui/StatsCard";
// import RecentTests from "./components/RecentTests"
import AggregateCalculator from "../../components/ui/AggregateCalculator";
import { BookOpen, CheckCircle, Clock, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">Dashboard</h2>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatsCard 
              title="Total Study Hours" 
              value={120} 
              icon={<Clock className="text-purple-600" size={24} />} 
            />
            <StatsCard 
              title="Completed MCQs" 
              value={1500} 
              icon={<CheckCircle className="text-purple-600" size={24} />} 
            />
            <StatsCard 
              title="Average Score" 
              value="78%" 
              icon={<TrendingUp className="text-purple-600" size={24} />} 
            />
            <StatsCard 
              title="Subjects Covered" 
              value={5} 
              icon={<BookOpen className="text-purple-600" size={24} />} 
            />
          </div>

          {/* Aggregate Calculator Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* <RecentTests /> */}
            <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
              <AggregateCalculator />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
