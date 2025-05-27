import { useMutation, useQuery } from "@tanstack/react-query";
import { toastStyles } from "../helper";
import Loader from "../components/Loader"
import { Trash } from "lucide-react";
import { deleteJob, getCompanyJobs, updateVisibility } from "../services/apiJob";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ManageJobs() {
  const navigate = useNavigate();
  const {company} = useAuth();
  const [check,setCheck] = useState(true);
  function handleDelete(id) {
    del(id);
  }
  function handleVisibility(id) {
    setCheck(!check);
    visibility(id);
  }
  
  const { mutate: del } = useMutation({
    mutationFn: (id) => deleteJob(id),
    onSuccess: () => {
      toast.success("Job Deleted", toastStyles);
    },
    onError: (err) => {
      toast.error(err.message, toastStyles);
    },
  });

  const { mutate: visibility } = useMutation({
    mutationFn: (id) => updateVisibility(id),
    onSuccess: () => {
      toast.success("Updated Visibility", toastStyles);
    },
    onError: (err) => {
      toast.error(err.message, toastStyles);
    },
  });

  const { data, isLoading,isError} = useQuery({
    queryKey: ["job"],
    queryFn: ()=>getCompanyJobs(company._id),
  });
  
  if(isLoading) 
    return <Loader/>
  if(isError){
    toast.error("Could not fetch jobs", toastStyles);
    navigate("/dashboard");
  }
  return (
    <div className="text-[8px] xs:text-xs md:text-base sm:mx-4">
      <div className="grid grid-cols-[0.25fr_0.25fr_0.2fr_0.15fr_0.15fr] border-1 border-gray-500 rounded-sm p-2 md:p-4 items-center justify-center">
        <h1 className=" font-semibold text-center">Job Title</h1>
        <h1 className=" font-semibold text-center">Date</h1>
        <h1 className=" font-semibold text-center">Location</h1>
        <h1 className=" font-semibold text-center">Visible</h1>
        <h1 className=" font-semibold text-center">Delete</h1>
      </div>
      {data?.data.jobs.map((job, index) => (
        <div
          key={index}
          className="text-gray-600 grid grid-cols-[0.25fr_0.25fr_0.2fr_0.15fr_0.15fr] items-center justify-center p-2 md:p-4 border-r-1 border-l-1 border-b-1 rounded-sm border-gray-500"
        >
          <h1 className="text-center">{job.title}</h1>
          <h1 className="text-center">
            {new Date(job.date).toLocaleDateString()}
          </h1>
          <h1 className="text-center">{job.location}</h1>
          <input type="checkbox" className="cursor-pointer" value={check} onClick={()=>handleVisibility(job._id)} defaultChecked/>
          <flex className="flex justify-center items-center">
            <Trash
              className="h-4 w-4 cursor-pointer"
              onClick={() => handleDelete(job._id)}
            />
          </flex>
        </div>
      ))}
    </div>
  );
}

export default ManageJobs;
