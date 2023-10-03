import React from "react";
import { paths } from "./Path";
import GuestRoute from "./GuestRoutes";
import PrivateRoute from "./PrivateRoutes";
import GuestLayout from "../components/layout/GuestLayout";
import Dashboard from '../pages/dashboard/Dashboard';
import Listing from '../pages/list/Listing';
import Sidebar from '../components/layout/sidebar/Sidebar';
import Login from "../pages/login/Login";
import { Navigate } from "react-router-dom";
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
      path: paths.DASHBOARD,
      element: <Dashboard />,
    },
    // List
    {
      path: paths.LISTING,
      element: <Listing/>,
    }
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
export const getRoutes = () => [
  AuthenticationRoutes,
  MainRoutes,
];