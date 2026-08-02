import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthLayout from "@/components/auth/AuthLayout";
import { registerUser } from "@/app/slices/auth/authThunk";
import { clearErrors } from "@/app/slices/auth/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, fieldErrors } = useSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(clearErrors());

    setValidationError("");

    if (!email.trim() || !username.trim() || !password || !confirmPassword) {
      setValidationError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    try {
      await dispatch(registerUser({ email, username, password })).unwrap();
      navigate("/auth/login");
    } catch (err) {
      // backend errors handled by Redux state
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register now to unlock focused sessions and personal progress tracking."
      footerText="Already registered?"
      footerLinkText="Sign in"
      footerLinkTo="/auth/login"
    >
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 w-full max-w-md px-1 sm:px-0">
        <AuthInput
          label="Email"
          id="register-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading}
          error={fieldErrors.email}
        />

        <AuthInput
          label="Username"
          id="register-username"
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          disabled={loading}
          error={fieldErrors.username}
        />

        <AuthInput
          label="Password"
          id="register-password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={loading}
          error={fieldErrors.password}
        />

        <AuthInput
          label="Confirm Password"
          id="register-confirm-password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          disabled={loading}
        />

        {(validationError || error) && (
          <p className="rounded-xl sm:rounded-2xl border border-danger bg-danger-soft px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-danger">
            {validationError || error}
          </p>
        )}

        <AuthButton loading={loading} disabled={loading} type="submit">
          Create account
        </AuthButton>
      </form>
    </AuthLayout>
  );
}