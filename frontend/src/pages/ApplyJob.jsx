import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Wallet } from "lucide-react";
import { User } from "lucide-react";
import { MapPin } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { getJob } from "../services/apiJob";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { applyJob, getUser } from "../services/apiUser";
import { toast } from "react-toastify";
import { toastStyles } from "../helper";
import { getApplication } from "../services/apiCompany";
import { useUser } from "@clerk/clerk-react";

function ApplyJob() {
  const { user } = useUser();
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["job"],
    queryFn: () => getJob(id),
  });

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
  function apply() {
    if(!userData.data.user.resume)
    {
      toast.error("Please upload resume from applied jobs section first",toastStyles);
      return;
    }
    mutate(id);
  }

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id) => applyJob(id),
    onSuccess: () => {
      toast.success("Applied successfully", toastStyles);
      queryClient.invalidateQueries({ queryKey: ["application"] });
    },
    onError: (err) => {
      toast.error(err.message, toastStyles);
    },
  });

  const { data: applicationData, isLoading: loading } = useQuery({
    queryKey: ["application"],
    queryFn: () => getApplication(id),
  });
  const users = applicationData?.data.user || "";

  if (isLoading || loading || !user) return <Loader />;
  let {
    title,
    company: companyDetails,
    location,
    level,
    salary,
    description,
    keyResponsibilities,
    skillsRequired,
  } = data.data.jobs || {};

  let responsibilities = keyResponsibilities.split(/\d+\./) || "";
  responsibilities = responsibilities.slice(1);
  let skills = skillsRequired.split(/\d+\./) || "";
  skills = skills.slice(1);

  return (
    <div className="w-[95%] sm:w-[90%] mx-auto font-outfit flex flex-col min-h-screen">
      <nav className="my-4">
        <Navbar />
      </nav>
      <section className="flex-grow">
        {data && (
          <>
            <div className="bg-blue-100 border-1 border-blue-400 rounded-sm p-4 sm:p-6 md:p-8 lg:p-10 my-5 md:my-8 space-y-2 md:space-y-3">
              <div className="md:flex items-center justify-between md:space-y-0 space-y-2">
                <div className="space-y-2 flex flex-col">
                  <div className="flex items-center gap-2 md:gap-4">
                    <img
                      src={companyDetails.image}
                      alt="logo"
                      className="h-6 w-8 sm:h-8 sm:w-12 lg:h-10 lg:w-16"
                    />
                    <h1 className="md:text-2xl sm:text-xl text-lg lg:text-[27px]">
                      {title}
                    </h1>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-6 lg:gap-10 text-xs sm:text-sm lg:text-lg">
                    <span className="flex gap-1 sm:gap-2 items-center">
                      <BriefcaseBusiness className="h-2 sm:h-4 sm:w-4 w-2" />
                      {companyDetails.name}
                    </span>
                    <span className="flex gap-1 sm:gap-2 items-center">
                      <MapPin className="h-2 sm:h-4 sm:w-4 w-2" />
                      {location}
                    </span>
                    <span className="flex gap-1 sm:gap-2 items-center">
                      <User className="h-2 sm:h-4 sm:w-4 w-2" />
                      {level}
                    </span>
                    <span className="flex gap-1 sm:gap-2 items-center">
                      <Wallet className="h-2 sm:h-4 sm:w-4 w-2" />
                      CTC: ${Math.round(Math.ceil(salary / 1000))}K
                    </span>
                  </div>
                </div>
                <button
                  onClick={apply}
                  disabled={users.userID === user.id}
                  className="disabled:cursor-not-allowed text-white bg-blue-500 px-2 md:px-4 lg:px-6 py-1 md:py-2 rounded-sm cursor-pointer hover:bg-blue-600 text-xs sm:text-sm lg:text-[16px]"
                >
                  {users.userID === user.id ? "Applied" : "Apply Now"}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 my-4 sm:my-6">
              <div className="space-y-1 sm:space-y-2">
                <h1 className="text-xl font-semibold">Job Description</h1>
                <p className="sm:w-[85%] text-gray-500 text-xs sm:text-sm md:text-[16px]">
                  {description}
                </p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <h1 className="text-xl font-semibold">Key Responsibility</h1>
                <ol
                  type="1"
                  className="list-decimal list-inside text-gray-500 text-xs sm:text-sm md:text-[16px]"
                >
                  <div className=" text-gray-500 text-xs sm:text-sm md:text-[16px]">
                    {responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </div>
                </ol>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <h1 className="text-xl font-semibold">Skills Required</h1>
                <ol
                  type="1"
                  className="list-decimal list-inside text-gray-500 text-xs sm:text-sm md:text-[16px]"
                >
                  <div className=" text-gray-500 text-xs sm:text-sm md:text-[16px]">
                    {skills.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </div>
                </ol>
              </div>
            </div>
            <button
              onClick={apply}
              disabled={users.userID === user.id}
              className="disabled:cursor-not-allowed hidden md:block mt-4 mb-10 lg:w-34 text-white bg-blue-500 px-2 md:px-4 lg:px-6 py-1 md:py-2 rounded-sm cursor-pointer hover:bg-blue-600 text-xs sm:text-sm lg:text-[16px]"
            >
              {users.userID === user.id ? "Applied" : "Apply Now"}
            </button>
          </>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default ApplyJob;
