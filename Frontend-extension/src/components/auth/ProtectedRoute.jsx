import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

let lastAuthToast = 0;
const AUTH_TOAST_COOLDOWN = 2000; // milliseconds

function ProtectedRoute() {
  const { initialized, isAuthenticated } = useSelector((state) => state.auth);

  if (!initialized) {
    return <>Loading...</>;
  }

  if (!isAuthenticated) {
    const now = Date.now();
    if (now - lastAuthToast > AUTH_TOAST_COOLDOWN) {
      toast.error("Not authenticated");
      lastAuthToast = now;
    }

    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
