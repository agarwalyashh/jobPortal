import { viewApplicationsPageData } from "../helper";
import { Ellipsis } from "lucide-react";
import { ArrowDownToLine } from "lucide-react";

function ViewApplications() {
  const data = viewApplicationsPageData;
  return (
    <div className="text-[8px] xs:text-xs md:text-base sm:mx-4">
      <div className="grid grid-cols-[0.25fr_0.25fr_0.25fr_0.25fr] md:grid-cols-[0.25fr_0.25fr_0.2fr_0.2fr_0.1fr] border-1 border-gray-500 rounded-sm p-2 md:p-4 items-center justify-center">
        <h1 className=" font-semibold text-center">Username</h1>
        <h1 className=" font-semibold text-center">Job Title</h1>
        <h1 className=" font-semibold text-center">Location</h1>
        <h1 className=" font-semibold text-center">Resume</h1>
        <h1 className="hidden md:block font-semibold text-center">Action</h1>
      </div>
      {data.map((job, index) => (
        <div
          key={index}
          className="text-gray-600 grid-cols-[0.25fr_0.25fr_0.25fr_0.25fr] grid md:grid-cols-[0.25fr_0.25fr_0.2fr_0.2fr_0.1fr] items-center justify-center p-2 md:p-4 border-r-1 border-l-1 border-b-1 rounded-sm border-gray-500"
        >
          <div className="flex items-center gap-2 justify-center">
            <img src={job.imgSrc} className="hidden md:block" />
            <h1 className="text-center">{job.name}</h1>
          </div>
          <h1 className="text-center">{job.jobTitle}</h1>
          <h1 className="text-center">{job.location}</h1>
          <h1 className="text-center md:p-1 sm:w-fit sm:h-fit my-auto rounded-md sm:mx-auto md:bg-blue-100 text-blue-500 flex items-center md:gap-1 cursor-pointer justify-center">
            <span>
              <ArrowDownToLine className="h-4 w-4 md:h-5 md:w-5" />
            </span>
            <p className="hidden md:inline">Resume</p>
          </h1>
          <div className="justify-center cursor-pointer relative group hidden md:flex">
            {" "}
            <span>
              <Ellipsis className="h-3 w-3 md:h-5 md:w-5" />
            </span>
            <div className="hidden group-hover:block absolute top-2 left-20 bg-white">
              <h1 className="text-blue-500 py-1 px-2 hover:bg-gray-100 rounded-sm">
                Accept
              </h1>
              <h1 className="text-red-500 py-1 px-2 hover:bg-gray-100 rounded-sm">
                Reject
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewApplications;
