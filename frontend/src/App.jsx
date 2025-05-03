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

// {
//   element: <Navigate to="tours" replace />,
//   index: true,
// },
