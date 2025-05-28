import { useState } from "react";
import { Upload } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getApplications, uploadResume } from "../services/apiUser";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { toastStyles } from "../helper";
import { useNavigate } from "react-router-dom";

function Applications() {
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();
  function handleResume(e) {
    const file = e.target.files[0];
    if (file) () => setResume(file);
    const dataToSend = new FormData();
    dataToSend.append("resume", file);
    mutate(dataToSend);
  }
  const {
    data,
    isLoading,
    isError: error,
  } = useQuery({
    queryKey: ["application"],
    queryFn: () => getApplications(),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (file) => uploadResume(file),
    onSuccess: () => {
      toast.success("Uploaded successfully", toastStyles);
    },
    onError: (err) => {
      toast.error(err.message, toastStyles);
    },
  });
  if (isLoading) return <Loader />;
  if (error || !data) {
    toast.error("Could not fetch data", toastStyles);
    navigate("/");
  }
  const jobs = data?.data?.jobs || [];
  const dates = jobs?.map((job) =>
    new Date(job.appliedAt).toLocaleDateString()
  );

  return (
    <div className="w-[95%] sm:w-[90%] mx-auto font-outfit flex flex-col min-h-screen">
      <nav className="mt-4 mb-10">
        <Navbar />
      </nav>
      <section className="flex-grow">
        <div className="flex gap-2 md:gap-4 items-center">
          <h1 className="font-medium text-sm sm:text-lg md:text-xl lg:text-2xl">
            Your Resume:
          </h1>
          <input
            id="resume"
            name="resume"
            hidden
            accept="application/pdf"
            type="file"
            onChange={handleResume}
          />
          <label
            htmlFor="resume"
            className="bg-blue-600 cursor-pointer rounded-sm p-1 h-4 sm:h-6 md:h-8"
          >
            <span>
              <Upload className="text-white" />
            </span>
          </label>
          {isPending ? "Uploading..." : ""}
          {resume && (
            <p className="underline text-xs sm:text-sm">{resume.name}</p>
          )}
        </div>
        {jobs.length > 0 && (
          <>
            <h1 className="font-medium text-sm sm:text-lg md:text-xl lg:text-2xl my-5 md:my-8">
              Jobs Applied
            </h1>
            <div className="grid grid-cols-12 w-full sm:w-[90%] text-[8px] xs:text-[10px] sm:text-sm md:text-lg border-1 border-slate-500 font-medium">
              <h1 className="col-span-2 sm:col-span-3 p-1 text-center">
                Company
              </h1>
              <h1 className="col-span-3 p-1 text-center">Job Title</h1>
              <h1 className="col-span-2 p-1 text-center">Location</h1>
              <h1 className="col-span-3 sm:col-span-2 p-1 text-center">Date</h1>
              <h1 className="col-span-2 p-1 text-center">Action</h1>
            </div>
            {jobs.map((job, index) => (
              <div
                key={job._id}
                className="grid grid-cols-12 w-full sm:w-[90%] text-[8px] xs:text-[10px] sm:text-sm md:text-[16px] text-gray-500 border-1 border-slate-500 "
              >
                <h1 className="col-span-2 sm:col-span-3 my-auto p-1 justify-center flex items-center gap-1 sm:gap-2">
                  <p>{job.company.name}</p>
                </h1>
                <h1 className="col-span-3 my-auto p-1 text-center">
                  {job.job.title}
                </h1>
                <h1 className="col-span-2 my-auto p-1 text-center">
                  {job.job.location}
                </h1>
                <h1 className="col-span-3 sm:col-span-2 my-auto p-1 text-center">
                  {dates[index]}
                </h1>
                <h1
                  className={`col-span-2 px-1 text-center sm:w-fit sm:h-fit my-auto rounded-md sm:mx-auto ${
                    job.status === "Pending"
                      ? "sm:bg-blue-200 text-blue-600"
                      : job.status === "Rejected"
                      ? "sm:bg-red-200 text-red-600"
                      : "sm:bg-green-200 text-green-600"
                  }`}
                >
                  {job.status}
                </h1>
              </div>
            ))}
          </>
        )}
        {jobs.length == 0 && (
          <div className="text-lg sm:text-xl md:text-2xl flex mx-auto justify-center items-center">
            You have not applied for any job.
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default Applications;
