import { createContext, useContext } from "react";
import { isLoggedIn } from "../services/apiAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loader";

const UserContext = createContext();

function AuthProvider({ children }) {
  const { data,isLoading } = useQuery({
    queryKey: ["login"],
    queryFn: isLoggedIn,
  });

  if(isLoading)
    return <Loading/>
  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
}

function useAuth() {
  const context = useContext(UserContext); 
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };