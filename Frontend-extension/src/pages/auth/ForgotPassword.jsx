import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthButton from "@/components/auth/AuthButton";
import AuthInput from "@/components/auth/AuthInput";
import AuthLayout from "@/components/auth/AuthLayout";
import { authApi } from "@/api/auth.api";
import { parseApiError } from "@/utils/apiError";
import {
  getPasswordValidationError,
  passwordRequirements,
} from "@/utils/password";
import { maskEmail } from "@/utils/maskUtils";

export default function ForgotPassword() {
  const [step, setStep] = useState("email"); // email | otp | password

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleResetPassword = async () => {
    setError("");
    setSuccess("");
    setFieldErrors({});

    if (!newPassword) {
      setError("Enter your new password.");
      return;
    }

    if (!confirmPassword) {
      setError("Confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const passwordError = getPasswordValidationError(newPassword);

    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      setLoading(true);

      const response = await authApi.resetPassword({
        email: email.trim(),
        otp: otp.trim(),
        newPassword,
      });

      setSuccess(response.message);

      setTimeout(() => {
        navigate("/auth/login", {
          replace: true,
          state: {
            successMessage: "Password reset successfully. Please sign in.",
          },
        });
      }, 1500);
    } catch (requestError) {
      const { message, fieldErrors } = parseApiError(
        requestError,
        "Unable to reset your password.",
      );

      setError(message);
      setFieldErrors(fieldErrors);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setError("");
    setSuccess("");
    setFieldErrors({});

    if (!/^\d{6}$/.test(otp.trim())) {
      setError("Enter the six-digit verification code.");
      return;
    }

    try {
      setLoading(true);

      const response = await authApi.verifyResetOtp(email.trim(), otp.trim());

      setSuccess(response.message);
      setStep("password");
    } catch (requestError) {
      console.error(requestError);

      const { message, fieldErrors } = parseApiError(
        requestError,
        "Unable to verify the verification code.",
      );

      setError(message);
      setFieldErrors(fieldErrors);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setFieldErrors({});

    if (!email.trim()) {
      setError("Enter the email address associated with your account.");
      return;
    }

    try {
      setLoading(true);

      const response = await authApi.forgotPassword(email.trim());

      setSuccess(response.message);
      setStep("otp");
    } catch (requestError) {
      const { message, fieldErrors } = parseApiError(
        requestError,
        "Unable to send a verification code.",
      );

      setError(message);
      setFieldErrors(fieldErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle={
        step === "email"
          ? "Enter your email to receive a verification code."
          : step === "otp"
            ? "Enter the six-digit verification code we sent you."
            : "Create a new secure password."
      }
      footerText="Remembered your password?"
      footerLinkText="Sign in"
      footerLinkTo="/auth/login"
    >
      <form onSubmit={handleEmailSubmit} className="space-y-4 sm:space-y-5 w-full max-w-md mx-auto px-1 sm:px-0">
        {step === "email" && (
          <>
            <AuthInput
              label="Email"
              id="forgot-password-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading}
              error={fieldErrors.email}
            />

            {error && (
              <p className="rounded-xl sm:rounded-2xl border border-danger bg-danger-soft px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-danger">
                {error}
              </p>
            )}

            {success && (
              <p className="rounded-xl sm:rounded-2xl border border-brand bg-success-soft px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-brand">
                {success}
              </p>
            )}

            <AuthButton loading={loading} disabled={loading} type="submit">
              Send verification code
            </AuthButton>
          </>
        )}

        {step === "otp" && (
          <>
            <div className="rounded-xl sm:rounded-2xl border border-border-default bg-surface dark:bg-page text-text p-3.5 sm:p-4">
              <p className="text-xs sm:text-sm text-text-soft">
                We've sent a verification code to
              </p>

              <p className="mt-1 text-sm sm:text-base font-semibold text-text truncate">
                {maskEmail(email)}
              </p>

              <button
                type="button"
                onClick={() => {
                  setOtp("");
                  setError("");
                  setFieldErrors({});
                  setStep("email");
                }}
                className="mt-2.5 sm:mt-3 text-xs sm:text-sm font-medium text-brand transition-colors hover:text-brand-muted"
              >
                Incorrect email? Change email
              </button>
            </div>

            <AuthInput
              label="Verification code"
              id="otp"
              placeholder="Enter the 6-digit code"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              disabled={loading}
              error={fieldErrors.otp}
            />

            {error && (
              <p className="rounded-xl sm:rounded-2xl border border-danger bg-danger-soft px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-danger">
                {error}
              </p>
            )}

            <AuthButton
              type="button"
              loading={loading}
              disabled={loading}
              onClick={handleOtpSubmit}
            >
              Verify code
            </AuthButton>
          </>
        )}

        {step === "password" && (
          <>
            <AuthInput
              label="New password"
              id="new-password"
              type="password"
              placeholder="Enter a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={fieldErrors.newPassword}
              disabled={loading}
            />

            <p className="-mt-2 sm:-mt-3 text-[11px] sm:text-xs leading-4 sm:leading-5 text-text-disabled">
              {passwordRequirements}
            </p>

            <AuthInput
              label="Confirm password"
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />

            {error && (
              <p className="rounded-xl sm:rounded-2xl border border-danger bg-danger-soft px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-danger">
                {error}
              </p>
            )}
            <AuthButton
              type="button"
              loading={loading}
              disabled={loading}
              onClick={handleResetPassword}
            >
              Reset password
            </AuthButton>
          </>
        )}
      </form>
    </AuthLayout>
  );
}