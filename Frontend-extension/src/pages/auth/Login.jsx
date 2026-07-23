import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthLayout from "@/components/auth/AuthLayout";
import { loginUser } from "@/app/slices/auth/authThunk";
import { clearErrors } from "@/app/slices/auth/authSlice";
export default function Login() {
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
      navigate("/");
    } catch {
      // backend errors handled by Redux state
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your focus journey."
      footerText="New to ZenMind?"
      footerLinkText="Create an account"
      footerLinkTo="/auth/register"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Email"
          id="login-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading}
          error={fieldErrors.email}
        />

        <AuthInput
          label="Password"
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={loading}
          error={fieldErrors.password}
        />

        {(validationError || error) && (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {validationError || error}
          </p>
        )}

        {location.state?.successMessage ? (
          <p className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-800">
            {location.state.successMessage}
          </p>
        ) : null}

        <AuthButton loading={loading} disabled={loading} type="submit">
          Sign in
        </AuthButton>

        <div className="text-right">
          <Link
            to="/auth/forgot-password"
            className="text-sm font-semibold text-slate-700 transition hover:text-green-primary"
          >
            Forgot your password?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
