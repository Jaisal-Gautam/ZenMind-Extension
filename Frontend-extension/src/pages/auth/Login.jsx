import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthLayout from "@/components/auth/AuthLayout";
import { loadCurrentUser, loginUser } from "@/app/slices/auth/authThunk";
import { clearErrors } from "@/app/slices/auth/authSlice";

import { loadBlockingConfig } from "@/app/slices/blocking/blockingThunk";

import { loadDashboard } from "@/api/dashboard.api";
import Loader from "@/components/Loader";

export default function Login() {
  const [bootstrapping, setBootstrapping] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, fieldErrors } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(clearErrors());
    setValidationError("");

    if (!email.trim() || !password) {
      setValidationError("Email and password are required.");
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      setBootstrapping(true);

      await dispatch(loadCurrentUser()).unwrap();

      await Promise.all([
        dispatch(loadBlockingConfig()).unwrap(),
        dispatch(loadDashboard()).unwrap()
      ]);
      navigate("/");
    } catch (e) {
      setBootstrapping(false);
    }
  };

  if (bootstrapping) {
    return <Loader />;
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your focus journey."
      footerText="New to ZenMind?"
      footerLinkText="Create an account"
      footerLinkTo="/auth/register"
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 w-full max-w-md mx-auto px-1 sm:px-0">
        <AuthInput
          label="Email"
          id="login-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading || bootstrapping}
          error={fieldErrors.email}
        />

        <AuthInput
          label="Password"
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={loading || bootstrapping}
          error={fieldErrors.password}
        />

        {(validationError || error) && (
          <p className="rounded-xl sm:rounded-2xl border border-danger bg-danger-soft px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-danger">
            {validationError || error}
          </p>
        )}

        {location.state?.successMessage ? (
          <p className="rounded-xl sm:rounded-2xl border border-brand bg-success-soft px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-brand">
            {location.state.successMessage}
          </p>
        ) : null}

        <AuthButton
          loading={loading}
          disabled={loading || bootstrapping}
          type="submit"
        >
          Sign in
        </AuthButton>

        <div className="text-right">
          <Link
            to="/auth/forgot-password"
            className="text-xs sm:text-sm font-semibold text-brand transition-colors hover:text-brand-muted"
          >
            Forgot your password?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}