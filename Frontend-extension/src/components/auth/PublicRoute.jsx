import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
let lastAuthToast = 0;
const AUTH_TOAST_COOLDOWN = 2000; // milliseconds

function PublicRoute() {
  const { initialized, isAuthenticated } = useSelector((state) => state.auth);

  if (!initialized) {
    return <>Loading...</>;
  }

  if (isAuthenticated) {
    const now = Date.now();
        if (now - lastAuthToast > AUTH_TOAST_COOLDOWN) {
          toast.success("Already authenticated");
          lastAuthToast = now;
        }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
