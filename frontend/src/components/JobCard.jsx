import { useUser } from "@clerk/clerk-react";
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import { toastStyles } from "../helper";
function JobCard({temp}) {
  const navigate = useNavigate()
  const {user} = useUser()
  function handleApply()
  {
    if(!user)
      toast.error("Please Login to continue",toastStyles)
    else
      navigate(`/apply-job/${temp._id}`)
  }
  return (
    <div className="border-1 border-slate-200 shadow-md rounded-sm p-4 w-75 md:w-85 h-fit md:h-80 space-y-2 my-2 relative">
      <img src={temp.company.image} alt="companyLogo" className="h-6 w-12"/>
      <h1 className="font-medium text-sm sm:text-lg">{temp.title}</h1>
      <div className="flex gap-4 items-center">
        <h1 className="bg-blue-100 border-blue-500 border-1 py-1 px-4 rounded-sm text-sm md:text-[16px]">
          {temp.location}
        </h1>
        <h1 className="bg-pink-100 border-pink-500 border-1 py-1 px-4 rounded-sm text-sm md:text-[16px]">
          {temp.level}
        </h1>
      </div>
      <p className="text-xs sm:text-sm">{temp.description.substring(0,200)+" ..."}</p>
      <div className="flex gap-2 items-center md:absolute bottom-6">
        <button onClick={handleApply} className="text-white bg-blue-500 px-2 md:px-4 lg:px-6 py-1 md:py-2 rounded-sm cursor-pointer hover:bg-blue-600 text-xs sm:text-sm lg:text-[16px]">
          Apply Now
        </button>
        <button onClick={handleApply} className="bg-slate-200 px-2 md:px-4 lg:px-6 py-1 md:py-2 rounded-sm cursor-pointer hover:bg-slate-300 text-xs sm:text-sm lg:text-[16px]">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default JobCard;
