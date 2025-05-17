import logo from "../assets/logo.svg";
 import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import { useState } from "react";
 import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
 
 function Navbar() {
   const { openSignIn } = useClerk();
   const { user } = useUser();
   const navigate = useNavigate();
   const [login,setLogin] = useState(false)
   return (
     <div className="flex justify-between items-center">
       <img
         onClick={() => navigate("/")}
         src={logo}
         alt="logo"
         className="cursor-pointer md:h-12 md:w-50 sm:h-10 sm:w-40 h-8 w-32"
       />
       {!user && (
         <div className="flex gap-4 items-center justify-center text-xs sm:text-sm sm:text-[16px]">
           <button className="cursor-pointer text-font" onClick={()=>setLogin(true)}>Recruiter Login</button>
           {login && <Login setLogin={setLogin}/>}
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
             <p className="hidden sm:block">
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