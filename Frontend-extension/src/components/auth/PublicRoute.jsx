import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import Loader from "../Loader";

function PublicRoute() {
  const { initialized, isAuthenticated } = useSelector((state) => state.auth);

  if (!initialized) {
    return <Loader/>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
