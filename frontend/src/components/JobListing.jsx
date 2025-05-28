import JobCard from "./JobCard";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";
import { useSearch } from "../context/searchContext";
import Loader from "./Loader";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../services/apiJob";

function JobListing() {
  const [searchParams] = useSearchParams();
  const { data:jobData, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => getJobs(),
  });
  let data = jobData?.data.jobs || [];
  const { searchFilter, sidebarFilter } = useSearch();
  if (isLoading) return <Loader />;
  const { searchJob, searchLocation } = searchFilter;
  const { selectedLocations, selectedCategories } = sidebarFilter;
  if (searchLocation || selectedLocations.length > 0) {
    data = data.filter(
      (job) =>
        selectedLocations?.includes(job.location) ||
        (searchLocation &&
          job.location.toLowerCase().includes(searchLocation.toLowerCase()))
    );
  }
  if (selectedCategories.length > 0) {
    data = data.filter((job) => selectedCategories.includes(job.category));
  }
  if (searchJob) {
    data = data.filter((job) =>
      job.category.toLowerCase().includes(searchJob.toLowerCase())
    );
  }
  const page = Number(searchParams.get("page")) || 1;
  const start = (page - 1) * 6;
  const end = page * 6;
  if (!data) return <Loader />;
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
          {data.slice(start, end).map((temp) => {
            return <JobCard key={temp._id} temp={temp} />;
          })}
        </div>
        {data.length > 0 && <Pagination data={data} />}
      </div>
    </div>
  );
}

export default JobListing;
