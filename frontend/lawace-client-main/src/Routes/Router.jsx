import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import ErrorPage from "../Pages/ErrorPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AllBlogs from "../Pages/AllBlogs/AllBlogs";
import BlogDetails from "../Pages/AllBlogs/BlogDetails";
import UpdateLawyerProfile from "../Pages/Dashboard/Lawyer/UpdateLawyerProfile";
import ExpertLawyers from "../Pages/ExpertLawyers/ExpertLawyers";
import LawyerDetails from "../Pages/ExpertLawyers/LawyerDetails";
import Appointments from "../Pages/Dashboard/Lawyer/Appointments";
import Blogs from "../Pages/Dashboard/Admin/Blogs";
import LawyerRoute from "./LawyerRoute";
import ContactUs from "../Components/Home/ContactUs/ContactUs";
import Profile from "../Pages/Dashboard/Profiles/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/allBlogs",
        element: <AllBlogs />,
      },
      {
        path: "/expertLawyers",
        element: <ExpertLawyers />,
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
      },
      {
        path: "/lawyer/:id",
        element: (
          <PrivateRoute>
            <LawyerDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/blogDetails/:id",
        element: (
          <PrivateRoute>
            <BlogDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "updateLawyerProfile",
        element: (
          <PrivateRoute>
            <LawyerRoute>
              <UpdateLawyerProfile />
            </LawyerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "allAppointments",
        element: (
          <PrivateRoute>
            <LawyerRoute>
              <Appointments />
            </LawyerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "allBlogs",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Blogs />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
