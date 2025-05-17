import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobsData } from "../helper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Wallet } from "lucide-react";
import { User } from "lucide-react";
import { MapPin } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
function ApplyJob() {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  useEffect(
    function () {
      setJob(jobsData.filter((job) => job._id === id));
    },
    [id]
  );
  const {
    title,
    companyId: companyDetails,
    location,
    level,
    salary,
    description,
    otherDetails,
  } = job[0] || {};
  return (
    <div className="w-[95%] sm:w-[90%] mx-auto font-outfit flex flex-col min-h-screen">
      <nav className="my-4">
        <Navbar />
      </nav>
      <section className="flex-grow">
        {job[0] && (
        <>
          <div className="bg-blue-100 border-1 border-blue-400 rounded-sm p-4 sm:p-6 md:p-8 lg:p-10 my-5 md:my-8 space-y-2 md:space-y-3">
            <div className="md:flex items-center justify-between md:space-y-0 space-y-2">
              <div className="space-y-2 flex flex-col">
                <div className="flex items-center gap-2 md:gap-4">
                  <img
                    src={companyDetails.image}
                    alt="logo"
                    className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
                  />
                  <h1 className="md:text-2xl sm:text-xl text-lg lg:text-[27px]">
                    {title}
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-6 lg:gap-10 text-xs sm:text-sm lg:text-lg">
                  <span className="flex gap-1 sm:gap-2 items-center">
                    <BriefcaseBusiness className="h-2 sm:h-4 sm:w-4 w-2" />
                    {companyDetails.name}
                  </span>
                  <span className="flex gap-1 sm:gap-2 items-center">
                    <MapPin className="h-2 sm:h-4 sm:w-4 w-2" />
                    {location}
                  </span>
                  <span className="flex gap-1 sm:gap-2 items-center">
                    <User className="h-2 sm:h-4 sm:w-4 w-2" />
                    {level}
                  </span>
                  <span className="flex gap-1 sm:gap-2 items-center">
                    <Wallet className="h-2 sm:h-4 sm:w-4 w-2" />
                    CTC: ${Math.round(Math.ceil(salary / 1000))}K
                  </span>
                </div>
              </div>
              <button className="text-white bg-blue-500 px-2 md:px-4 lg:px-6 py-1 md:py-2 rounded-sm cursor-pointer hover:bg-blue-600 text-xs sm:text-sm lg:text-[16px]">
                Apply Now
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 my-4 sm:my-6">
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-xl font-semibold">Job Description</h1>
              <p className="sm:w-[85%] text-gray-500 text-xs sm:text-sm md:text-[16px]">
                {description}
              </p>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-xl font-semibold">Key Responsibility</h1>
              <ol
                type="1"
                className="list-decimal list-inside text-gray-500 text-xs sm:text-sm md:text-[16px]"
              >
                {otherDetails.keyResponsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-xl font-semibold">Skills Required</h1>
              <ol
                type="1"
                className="list-decimal list-inside text-gray-500 text-xs sm:text-sm md:text-[16px]"
              >
                {otherDetails.skillsRequired.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </div>
          </div>
          <button className="hidden md:block mt-4 mb-10 lg:w-34 text-white bg-blue-500 px-2 md:px-4 lg:px-6 py-1 md:py-2 rounded-sm cursor-pointer hover:bg-blue-600 text-xs sm:text-sm lg:text-[16px]">
            Apply Now
          </button>
        </>
      )}
      </section>
      <Footer />
    </div>
  );
}

export default ApplyJob;
