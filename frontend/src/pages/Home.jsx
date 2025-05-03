import Hero from "../components/Hero"
import JobListing from "../components/JobListing"
import Navbar from "../components/Navbar"
 
 function Home() {
   return (
     <div className="w-[95%] sm:w-[90%] mx-auto my-4 font-outfit">
       <Navbar/>
       <Hero/>
       <JobListing/>
     </div>
   )
 }
 
 export default Home