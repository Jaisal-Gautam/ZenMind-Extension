import { useState } from "react";
import { Link } from "react-router-dom";
import AuthButton from "@/components/auth/AuthButton";
import AuthInput from "@/components/auth/AuthInput";
import AuthLayout from "@/components/auth/AuthLayout";
import { authApi } from "@/api/auth.api";

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || fallback;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Enter the email address associated with your account.");
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.forgotPassword(email.trim());
      setSuccess(response.message);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to send a verification code."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we’ll send a six-digit verification code."
      footerText="Remembered your password?"
      footerLinkText="Sign in"
      footerLinkTo="/auth/login"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Email"
          id="forgot-password-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading}
        />

        {error ? (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        ) : null}
        {success ? (
          <p className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-800">{success}</p>
        ) : null}

        <AuthButton loading={loading} disabled={loading} type="submit">
          Send verification code
        </AuthButton>

        <Link
          to={`/auth/reset-password?email=${encodeURIComponent(email.trim())}`}
          className="block text-center text-sm font-semibold text-slate-700 transition hover:text-green-primary"
        >
          I have a verification code
        </Link>
      </form>
    </AuthLayout>
  );
}
