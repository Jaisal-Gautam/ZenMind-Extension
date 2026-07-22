import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthButton from "@/components/auth/AuthButton";
import AuthInput from "@/components/auth/AuthInput";
import AuthLayout from "@/components/auth/AuthLayout";
import { authApi } from "@/api/auth.api";
import { logoutLocal } from "@/app/slices/auth/authSlice";
import { removeAuth } from "@/utils/chromeStorage";
import { getPasswordValidationError, passwordRequirements } from "@/utils/password";

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || fallback;

export default function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    const passwordError = getPasswordValidationError(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (currentPassword === newPassword) {
      setError("Your new password must be different from your current password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await authApi.changePassword({ currentPassword, newPassword });
      await removeAuth();
      dispatch(logoutLocal());
      navigate("/auth/login", {
        replace: true,
        state: { successMessage: "Password changed successfully. Please sign in again." },
      });
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to change your password."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Change your password" subtitle="For your security, you’ll be signed out after changing it.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput label="Current password" id="current-password" type="password" placeholder="Enter your current password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} disabled={loading} />
        <AuthInput label="New password" id="change-new-password" type="password" placeholder="Create a new password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} disabled={loading} />
        <p className="-mt-3 text-xs leading-5 text-slate-500">{passwordRequirements}</p>
        <AuthInput label="Confirm new password" id="change-confirm-password" type="password" placeholder="Confirm your new password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} disabled={loading} />

        {error ? <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
        <AuthButton loading={loading} disabled={loading} type="submit">Change password</AuthButton>
      </form>
    </AuthLayout>
  );
}
