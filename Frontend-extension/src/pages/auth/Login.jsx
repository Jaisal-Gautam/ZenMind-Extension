import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthLayout from "@/components/auth/AuthLayout";
import { loginUser } from "@/app/slices/auth/authThunk";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationError("");

    if (!username.trim() || !password) {
      setValidationError("Username and password are required.");
      return;
    }

    try {
      await dispatch(loginUser({ username, password })).unwrap();
      navigate("/");
    } catch (err) {
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
          label="Username"
          id="login-username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          disabled={loading}
        />

        <AuthInput
          label="Password"
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={loading}
        />

        {(validationError || error) && (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {validationError || error}
          </p>
        )}

        <AuthButton loading={loading} disabled={loading} type="submit">
          Sign in
        </AuthButton>
      </form>
    </AuthLayout>
  );
}
