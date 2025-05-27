import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import Footer from "../components/Footer";
import { UserRoundCheck } from "lucide-react";
import { FilePlus } from "lucide-react";
import { House } from "lucide-react";
import { useAuth } from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { toastStyles } from "../helper";
import { recruiterLogout } from "../services/apiAuth";

function Dashboard() {
  const { company } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: () => recruiterLogout(),
    onSuccess: () => {
      toast.success("Logout successful", toastStyles);
      queryClient.invalidateQueries({ queryKey: ["login"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message, toastStyles);
    },
  });

  function handleLogout() {
    logout();
  }
  if(!company)
    return <></>
  return (
    <div className="min-h-screen flex flex-col w-[95%] font-outfit mx-auto my-4">
      <nav className="flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="logo"
          className="cursor-pointer md:h-12 md:w-50 sm:h-10 sm:w-40 h-8 w-32"
        />
        <div className="flex items-center gap-4 text-xs sm:text-sm md:text-base">
          <div className="flex items-center gap-2 sm:text-lg text-sm lg:text-xl text-font">
            <p className="hidden sm:block">
              Welcome,
            </p>
            <img
              src={company.image}
              alt="company-logo"
              className="h-4 w-8 sm:h-6 sm:w-12 lg:h-8 lg:w-16"
            />
          </div>
          <button
            className="cursor-pointer py-1 px-2 bg-blue-600 rounded-sm text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
      <section className="flex-grow grid grid-cols-[0.15fr_0.85fr] my-8">
        <div className="space-y-4 text-gray-800 text-sm md:text-base">
          <NavLink
            className="flex items-center gap-2 p-1 sm:p-2 rounded-sm"
            to="manage-jobs"
          >
            <span>
              <House className="h-4 w-4 sm:h-6 md:w-6 lg:h-8 lg:w-8" />
            </span>
            <p className="hidden sm:block">Manage Jobs</p>
          </NavLink>
          <NavLink
            className="flex items-center gap-2 p-1 sm:p-2 rounded-sm"
            to="add-job"
          >
            <span>
              <FilePlus className="h-4 w-4 sm:h-6 md:w-6 lg:h-8 lg:w-8" />
            </span>
            <p className="hidden sm:block">Add Job</p>
          </NavLink>
          <NavLink
            className="flex items-center gap-2 p-1 sm:p-2 rounded-sm"
            to="view-applications"
          >
            <span>
              <UserRoundCheck className="h-4 w-4 sm:h-6 md:w-6 lg:h-8 lg:w-8" />
            </span>
            <p className="hidden sm:block">View Applications</p>
          </NavLink>
        </div>
        <Outlet />
      </section>
      <Footer />
    </div>
  );
}

export default Dashboard;
