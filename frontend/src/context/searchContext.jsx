import { createContext, useContext, useState } from "react";

const searchContext = createContext();
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
    <searchContext.Provider
      value={{ searchFilter, setSearchFilter, isSearched, setIsSearched,sidebarFilter,setSidebarFilter }}
    >
      {children}
    </searchContext.Provider>
  );
}

function useSearch() {
  const context = useContext(searchContext);
  if (!context) {
    throw new Error("useSearch must be used within an SearchProvider");
  }
  return context;
}

export { SearchProvider, useSearch };
