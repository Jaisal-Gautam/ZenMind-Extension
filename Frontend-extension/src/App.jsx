import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import FocusPage from "./pages/focus/FocusPage";
import Navbar from "./components/Nav";
import { Toaster } from "@/components/ui/sonner";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Loader from "./components/Loader";

const AnalyticPage = lazy(() => import("./pages/analytics/AnalyticPage"));
const BlockingPage = lazy(() => import("./pages/blocking/BlockingPage"));
const ChangePassword = lazy(() => import("./pages/auth/ChangePassword"));
function App() {
  return (
    <div className="bg-neutral-tertiary">
      <Navbar />
      <Toaster />

      <div className="min-h-screen max-h-full max-w-7xl mx-auto">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<FocusPage />} />

              <Route path="/analytics" element={<AnalyticPage />} />
              <Route path="/blocking" element={<BlockingPage />} />

              <Route
                path="/auth/change-password"
                element={<ChangePassword />}
              />
            </Route>

            <Route element={<PublicRoute />}>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route
                path="/auth/forgot-password"
                element={<ForgotPassword />}
              />
              <Route path="/auth" element={<Login />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
