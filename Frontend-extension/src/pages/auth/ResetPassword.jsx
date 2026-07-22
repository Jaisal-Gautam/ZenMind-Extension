import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthButton from "@/components/auth/AuthButton";
import AuthInput from "@/components/auth/AuthInput";
import AuthLayout from "@/components/auth/AuthLayout";
import { authApi } from "@/api/auth.api";
import { getPasswordValidationError, passwordRequirements } from "@/utils/password";

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || fallback;

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !otp || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the six-digit verification code from your email.");
      return;
    }
    const passwordError = getPasswordValidationError(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await authApi.resetPassword({ email: email.trim(), otp, newPassword });
      navigate("/auth/login", {
        replace: true,
        state: { successMessage: "Password reset successfully. Please sign in." },
      });
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to reset your password."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Choose a new password"
      subtitle="Use the verification code sent to your email to secure your account."
      footerText="Need another code?"
      footerLinkText="Send a new one"
      footerLinkTo="/auth/forgot-password"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput label="Email" id="reset-email" type="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={loading} />
        <AuthInput label="Verification code" id="reset-otp" inputMode="numeric" placeholder="Six-digit code" value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))} disabled={loading} />
        <AuthInput label="New password" id="reset-new-password" type="password" placeholder="Create a new password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} disabled={loading} />
        <p className="-mt-3 text-xs leading-5 text-slate-500">{passwordRequirements}</p>
        <AuthInput label="Confirm new password" id="reset-confirm-password" type="password" placeholder="Confirm your new password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} disabled={loading} />

        {error ? <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
        <AuthButton loading={loading} disabled={loading} type="submit">Reset password</AuthButton>
      </form>
    </AuthLayout>
  );
}
