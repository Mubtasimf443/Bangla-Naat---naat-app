/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import 'react-toastify/ReactToastify.css'
import "./index.css";

import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/Login";
import Naats from "./pages/Naats";
import CreateNaat from "./pages/CreateNaat";
import Users from "./pages/Users";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/naats" replace /> },
      { path: "naats", element: <Naats /> },
      { path: "naats/create", element: <CreateNaat /> },
      { path: "users", element: <Users /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>
);
