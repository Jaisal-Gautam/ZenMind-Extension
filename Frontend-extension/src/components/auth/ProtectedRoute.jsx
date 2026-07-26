import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../Loader";
let lastAuthToast = 0;
const AUTH_TOAST_COOLDOWN = 1500; // milliseconds

function ProtectedRoute() {
  const { initialized, isAuthenticated } = useSelector((state) => state.auth);

  if (!initialized) {
    return <Loader/>;
  }

  if (!isAuthenticated) {
    const now = Date.now();
    if (now - lastAuthToast > AUTH_TOAST_COOLDOWN) {
      toast.error("You Are Not Logged In...");
      lastAuthToast = now;
    }

    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
