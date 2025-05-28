import { useSearch } from "../context/searchContext";
import { X } from "lucide-react";
import Filters from "./Filters";
import { useState } from "react";
function Sidebar() {
  const { isSearched, searchFilter, setSearchFilter, setIsSearched } =
    useSearch();

  const [filters, setFilters] = useState(false);

  if (!searchFilter.searchJob && !searchFilter.searchLocation)
    setIsSearched(false);

  return (
    <div>
      {isSearched &&
        (searchFilter.searchJob || searchFilter.searchLocation) && (
          <>
            <h1 className="text-sm md:text-xl font-medium">Current Search</h1>
            <div className="flex gap-4 items-center mt-2">
              {searchFilter.searchJob && (
                <div className="relative">
                  <h1 className="bg-blue-200 border-blue-500 border-1 py-1 md:py-2 px-4 md:px-6 rounded-sm text-sm md:text-[16px]">
                    {searchFilter.searchJob}
                  </h1>
                  <X
                    className="absolute -right-1 top-0 h-3 cursor-pointer"
                    onClick={() =>
                      setSearchFilter({ ...searchFilter, searchJob: "" })
                    }
                  />
                </div>
              )}
              {searchFilter.searchLocation && (
                <div className="relative">
                  <h1 className="bg-pink-200 border-pink-500 border-1 py-1 md:py-2 px-4 md:px-6 rounded-sm text-sm md:text-[16px]">
                    {searchFilter.searchLocation}
                  </h1>
                  <X
                    className="absolute -right-1 top-0 h-3 cursor-pointer"
                    onClick={() =>
                      setSearchFilter({ ...searchFilter, searchLocation: "" })
                    }
                  />
                </div>
              )}
            </div>
          </>
        )}
      <div className="hidden sm:block">
        <Filters />
      </div>
      <button
        className="border-[0.5px] px-4 py-2 rounded-sm cursor-pointer focus:outline-none font-medium sm:hidden text-xs my-2"
        onClick={() => setFilters(!filters)}
      >
        {filters ? "Hide Filters" : "Show Filters"}
      </button>
      {filters && (
        <div className="sm:hidden">
          <Filters />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
