import logo from "../assets/logo.svg";
 import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
 import { Link } from "react-router-dom";
 
 function Navbar() {
   const { openSignIn } = useClerk();
   const { user } = useUser();
   console.log(user);
 
   return (
     <div className="flex justify-between items-center">
       <img
         src={logo}
         alt="logo"
         className="md:h-12 md:w-50 sm:h-10 sm:w-40 h-8 w-32"
       />
       {!user && (
         <div className="flex gap-4 items-center justify-center text-xs sm:text-sm sm:text-[16px]">
           <button className="cursor-pointer text-font">Recruiter Login</button>
           <button
             onClick={() => openSignIn()}
             className="bg-blue-600 rounded-full px-4 md:px-6 py-1 md:py-2 text-white cursor-pointer"
           >
             Login
           </button>
         </div>
       )}
       {user && (
         <div className="flex gap-4 items-center justify-center sm:text-lg text-sm lg:text-xl text-font">
           <Link to="/applications">Applied Jobs</Link>
           <p> | </p>
           <div className="flex items-center gap-2">
             <p className="">
               Welcome, <span className="capitalize">{user.firstName}</span>
             </p>
             <UserButton />
           </div>
         </div>
       )}
     </div>
   );
 }
 
 export default Navbar;