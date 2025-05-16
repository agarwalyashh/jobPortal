import { createContext, useContext, useState } from "react";

const SearchContext = createContext();
function SearchProvider({ children }) {
  const [searchFilter, setSearchFilter] = useState({
    searchJob: "",
    searchLocation: "",
  });
  const [sidebarFilter,setSidebarFilter] = useState({
    selectedCategories:[],
    selectedLocations:[]
  });
  const [isSearched, setIsSearched] = useState(false);
  return (
    <SearchContext.Provider
      value={{ searchFilter, setSearchFilter, isSearched, setIsSearched,sidebarFilter,setSidebarFilter }}
    >
      {children}
    </SearchContext.Provider>
  );
}

function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within an SearchProvider");
  }
  return context;
}

export { SearchProvider, useSearch };
