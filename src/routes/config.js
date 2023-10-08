import React from "react";
import { paths } from "./Path";
import GuestRoute from "./GuestRoutes";
import PrivateRoute from "./PrivateRoutes";
import GuestLayout from "../components/layout/GuestLayout";
import Proposal from "../pages/proposal/Proposal";
import Offering from "../pages/offering/Offering";
// import Sidebar from "../components/layout/sidebar/Sidebar";
import Login from "../pages/login/Login";
// import { Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

const MainRoutes = {
  path: paths.DEFAULT,
  element: (
    <PrivateRoute>
      <Layout />
    </PrivateRoute>
  ),
  children: [
    // Dashboard
    {
      path: paths.PROPOSAL,
      element: <Proposal />,
    },
    //Offering
    {
      path: paths.OFFERING,
      element: <Offering />,
    },
  ],
};

const AuthenticationRoutes = {
  path: paths.DEFAULT,
  element: (
    <GuestRoute>
      <GuestLayout />
    </GuestRoute>
  ),
  children: [
    {
      path: paths.DEFAULT,
      element: <Login />,
    },
    // {
    //   path: paths.DEFAULT,
    //   element: <Navigate to={paths.DEFAULT} replace />,
    // },
  ],
};

/**
 * @params {boolean}
 * @return {Array} of all paths & routes
 */
export const getRoutes = () => [AuthenticationRoutes, MainRoutes];
