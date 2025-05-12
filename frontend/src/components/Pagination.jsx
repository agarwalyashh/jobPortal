import { useSearchParams } from "react-router-dom";
import { jobsData } from "../helper";

const totalJobs = jobsData.length;
const PAGE_SIZE = 6;
const totalPages = Math.ceil(totalJobs / PAGE_SIZE);
function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  function handlePrevious() {
    searchParams.set("page", Number(page) - 1);
    setSearchParams(searchParams);
  }
  function handleNext() {
    searchParams.set("page", Number(page) + 1);
    setSearchParams(searchParams);
  }
  return (
    <div className="flex justify-start lg:justify-end items-center gap-2 p-6">
      <button
        disabled={page == 1}
        onClick={handlePrevious}
        className="px-2 sm:px-4 sm:py-2 py-1 rounded-sm text-white bg-slate-500 disabled:cursor-not-allowed cursor-pointer hover:bg-slate-600"
      >
        Previous
      </button>
      <button
        disabled={page == totalPages}
        onClick={handleNext}
        className="px-2 sm:px-4 sm:py-2 py-1 rounded-sm text-white bg-slate-500 disabled:cursor-not-allowed cursor-pointer hover:bg-slate-600"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
