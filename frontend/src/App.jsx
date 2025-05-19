import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Error from "./components/Error";
import Home from "./pages/Home";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import Dashboard from "./pages/Dashboard";
import ViewApplications from "./pages/ViewApplications";
import ManageJobs from "./pages/ManageJobs";
import AddJob from "./pages/AddJob";
import { SearchProvider } from "./context/searchContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/apply-job/:id",
      element: <ApplyJob />,
    },
    {
      path: "/applications",
      element: <Applications />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <Error />,
      children: [
        {
          path: "view-applications",
          element: <ViewApplications />,
        },
        {
          path: "add-job",
          element: <AddJob />,
        },
        {
          path: "manage-jobs",
          element: <ManageJobs />,
        },
        {
          element: <Navigate to="manage-jobs" replace />,
          index: true,
        },
      ],
    },
  ]);
  return (
    <>
      <SearchProvider>
        <ToastContainer limit={2} hideProgressBar />
        <RouterProvider router={router} />
      </SearchProvider>
    </>
  );
}

export default App;