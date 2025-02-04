import React from "react"
import Header from "./Header"
import Hero from "./Hero"
import About from "./About"
// import PreparationMaterials from "./PreparationMaterials"
import ContactUs from "./Contactus"
import Footer from "./Footer"
import AggregateCalculator from "../../components/ui/AggregateCalculator"
import StatsCard from "../../components/ui/StatsCard"
import { BookOpen, CheckCircle, Clock, TrendingUp } from "lucide-react"

export default function MainHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatsCard
              title="Total Study Hours" 
              value="12+" 
              icon={<Clock className="text-purple-600" size={24} />} 
            />
            
            <StatsCard 
              title="Completed MCQs" 
              value="1500+"  
              icon={<CheckCircle className="text-purple-600" size={24} />} 
            />
            <StatsCard 
              title="Average Score" 
              value="90%" 
              icon={<TrendingUp className="text-purple-600" size={24} />} 
            />
            <StatsCard 
              title="Subjects Covered" 
              value={4} 
              icon={<BookOpen className="text-purple-600" size={24} />} 
            />
          </div>
          <AggregateCalculator/>
        <About />
        {/* <PreparationMaterials /> */}
        <ContactUs />
      </main>
      <Footer />
    </div>
  )
}

