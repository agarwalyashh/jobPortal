import { manageJobsData } from "../helper";

function ManageJobs() {
  const data = manageJobsData;

  return (
    <div className="text-[8px] xs:text-xs md:text-base sm:mx-4">
      <div className="grid grid-cols-[0.25fr_0.25fr_0.2fr_0.2fr_0.1fr] border-1 border-gray-500 rounded-sm p-2 md:p-4 items-center justify-center">
        <h1 className=" font-semibold text-center">Job Title</h1>
        <h1 className=" font-semibold text-center">Date</h1>
        <h1 className=" font-semibold text-center">Location</h1>
        <h1 className=" font-semibold text-center">Applicants</h1>
        <h1 className=" font-semibold text-center">Visible</h1>
      </div>
      {data.map((job, index) => (
        <div key={index} className="text-gray-600 grid grid-cols-[0.25fr_0.25fr_0.2fr_0.2fr_0.1fr] items-center justify-center p-2 md:p-4 border-r-1 border-l-1 border-b-1 rounded-sm border-gray-500">
          <h1 className="text-center">{job.title}</h1>
          <h1 className="text-center">{new Date(job.date).toLocaleDateString()}</h1>
          <h1 className="text-center">{job.location}</h1>
          <h1 className="text-center">{job.applicants}</h1>
          <input type="checkbox" className="cursor-pointer"/>
        </div>
      ))}
    </div>
  );
}

export default ManageJobs;
