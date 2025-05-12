import JobCard from "./JobCard";
import Sidebar from "./Sidebar";
import { jobsData } from "../helper";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";

function JobListing() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const start = page * 6 - 6;
  const end = page * 6;
  
  return (
    <div className="my-10 sm:grid sm:grid-cols-[0.3fr_0.7fr] lg:grid-cols-[0.2fr_0.8fr]">
      <Sidebar />
      <div className="my-6">
        <h1 className="text-xl sm:text-2xl xl:text-3xl font-medium">
          Latest Jobs
        </h1>
        <p className="text-sm md:text-lg">
          Get your desired job from top companies
        </p>
        <div className="flex flex-wrap gap-6 items-center">
          {jobsData.slice(start, end).map((temp) => {
            return <JobCard key={temp.id} temp={temp} />;
          })}
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default JobListing;
