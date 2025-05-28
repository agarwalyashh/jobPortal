import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearch } from "../context/searchContext";
function Filters() {
  const categories = [
    "Programming",
    "Designing",
    "Marketing",
    "Accounting",
    "Analytics",
    "HR",
    "Sales",
    "Management",
  ];
  const location = [
    "Bangalore",
    "Hyderabad",
    "Mumbai",
    "Chennai",
    "Gurgaon",
    "Pune",
    "Noida",
    "Ahemdabad",
  ];
  const {setSidebarFilter} = useSearch()
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  function handleJob(category) {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(()=>newCategories);
    setSidebarFilter({
      selectedCategories: newCategories,
      selectedLocations: selectedLocations,
    })

    const newParams = new URLSearchParams(searchParams);
    newParams.delete("category");
    newParams.delete("page");
    newCategories.forEach((c) => newParams.append("category", c));
    setSearchParams(newParams);
  }

  function handleLocation(location) {
    const newLocations = selectedLocations.includes(location)
      ? selectedLocations.filter((l) => l !== location)
      : [...selectedLocations, location];

    setSelectedLocations(()=>newLocations);
    setSidebarFilter({
      selectedCategories: selectedCategories,
      selectedLocations: newLocations,
    })

    const newParams = new URLSearchParams(searchParams);
    newParams.delete("location");
    newParams.delete("page");
    newLocations.forEach((l) => newParams.append("location", l));
    setSearchParams(newParams);
  }

  return (
    <div>
      <div className="my-8">
        <h1 className="text-sm md:text-xl font-medium">Search By Categories</h1>
        <div className="flex flex-col gap-4 my-4">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center gap-2 text-font">
              <input type="checkbox" id={`category-${index}`} />
              <label
                htmlFor={`category-${index}`}
                className="cursor-pointer text-xs sm:text-sm lg:text-[16px]"
                onClick={() => handleJob(category)}
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="my-8">
        <h1 className="text-sm md:text-xl font-medium">Search By Location</h1>
        <div className="flex flex-col gap-4 my-4">
          {location.map((category, index) => (
            <div key={index} className="flex items-center gap-2 text-font">
              <input type="checkbox" id={`location-${index}`} />
              <label
                htmlFor={`location-${index}`}
                className="cursor-pointer text-xs sm:text-sm lg:text-[16px]"
                onClick={() => handleLocation(category)}
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;
