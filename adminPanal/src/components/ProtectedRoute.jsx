/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute =async () => {
  let response = await fetch('/api/auth/get_role');

  return <Outlet />;
};

export default ProtectedRoute;