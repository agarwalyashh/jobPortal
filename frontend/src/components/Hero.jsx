import { Search } from "lucide-react";
import { MapPin } from "lucide-react";
import amazon from "../assets/amazon_logo.png";
import accenture from "../assets/accenture_logo.png";
import adobe from "../assets/adobe_logo.png";
import microsoft from "../assets/microsoft_logo.svg";
import walmart from "../assets/walmart_logo.svg";
import { useSearch } from "../context/searchContext";
import { useState } from "react";

function Hero() {
  const { setSearchFilter, setIsSearched , searchFilter} = useSearch();
  const [location, setLocation] = useState(searchFilter.searchLocation);
  const [job, setJob] = useState(searchFilter.searchJob);

  function handleSearch() {
    setSearchFilter({
      searchJob: job,
      searchLocation: location,
    });
    setIsSearched(true);
  }
  return (
    <>
      <div className="container mx-auto bg-gradient-to-r from-purple-800 to-purple-950 my-4 sm:my-6 lg:my-8 text-white py-8 sm:py-10 lg:py-12 rounded-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
          Over 10,000+ Jobs to apply
        </h1>
        <p className="capitalize text-xs sm:text-sm md:text-[16px] text-center mt-4 w-72 sm:w-90 md:w-150 mx-auto">
          Your next big career move starts right here - Explore the best job
          opportunities and take the first step towards your future!
        </p>
        <div className="my-4 md:my-6 lg:my-10 md:px-2 px-1 py-1 md:py-2 w-fit mx-auto flex items-center justify-center gap-1 sm:gap-4 md:gap-6 bg-white rounded-sm">
          <div className="flex items-center sm:gap-1">
            <Search className="text-font h-2.5 md:h-4.5 mt-0.5" />
            <input
              placeholder="Search For Jobs"
              type="text"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className="focus:outline-none p-1 md:p-2 placeholder:text-font text-slate-500 text-xs sm:text-sm md:text-[16px] w-24 sm:w-36"
            />
          </div>
          <p className="text-font"> | </p>
          <div className="flex items-center sm:gap-1">
            <MapPin className="text-font h-2.5 md:h-4.5 mt-0.5" />
            <input
              placeholder="Location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="focus:outline-none p-1 md:p-2 placeholder:text-font text-slate-500 text-xs sm:text-sm md:text-[16px] w-22 sm:w-36"
            />
          </div>
          <button
            onClick={handleSearch}
            className="sm:block hidden bg-blue-600 px-6 md:px-8 lg:px-10 py-1 md:py-2 rounded-sm cursor-pointer hover:bg-blue-700 text-xs sm:text-sm lg:text-[16px]"
          >
            Search
          </button>
        </div>
        <button
          onClick={handleSearch}
          className="sm:hidden block mx-auto bg-blue-600 px-6 md:px-8 lg:px-10 py-1 md:py-2 rounded-sm cursor-pointer hover:bg-blue-700 text-xs sm:text-sm lg:text-[16px]"
        >
          Search
        </button>
      </div>
      <div className="p-2 md:p-4 shadow-md flex flex-wrap gap-6 md:gap-10 items-center border-[0.5px] rounded-sm border-font-light">
        <p className="text-font text-xs sm:text-sm md:text-[16px]">
          Trusted By
        </p>
        <img src={amazon} alt="amazon" className="h-4 md:h-6" />
        <img src={accenture} alt="accenture" className="h-4 md:h-6" />
        <img src={adobe} alt="adobe" className="h-4 md:h-6" />
        <img src={walmart} alt="walmart" className="h-4 md:h-6" />
        <img src={microsoft} alt="microsoft" className="h-4 md:h-6" />
      </div>
    </>
  );
}

export default Hero;
