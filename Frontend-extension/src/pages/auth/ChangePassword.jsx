import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthButton from "@/components/auth/AuthButton";
import AuthInput from "@/components/auth/AuthInput";
import AuthLayout from "@/components/auth/AuthLayout";
import { authApi } from "@/api/auth.api";
import { logoutLocal } from "@/app/slices/auth/authSlice";
import { removeAuth, removeData } from "@/utils/chromeStorage";
import { parseApiError } from "@/utils/apiError";
import {
  getPasswordValidationError,
  passwordRequirements,
} from "@/utils/password";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setFieldErrors({});

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
      setError(
        "Your new password must be different from your current password.",
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      console.log("1");
      await authApi.changePassword({ currentPassword, newPassword });
      console.log("2");
      await removeData();
      console.log("3");
      await removeAuth();
      console.log("4");

      dispatch(logoutLocal());
      navigate("/auth/login", {
        replace: true,
        state: {
          successMessage:
            "Password changed successfully. Please sign in again.",
        },
      });
    } catch (requestError) {
      console.error(requestError);
      console.log(requestError.response);

      const { message, fieldErrors } = parseApiError(
        requestError,
        "Unable to change your password.",
      );

      setError(message);
      setFieldErrors(fieldErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Change your password"
      subtitle="For your security, you’ll be signed out after changing it."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Current password"
          id="current-password"
          type="password"
          placeholder="Enter your current password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          disabled={loading}
          error={fieldErrors.currentPassword}
        />
        <AuthInput
          label="New password"
          id="change-new-password"
          type="password"
          placeholder="Create a new password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          disabled={loading}
          error={fieldErrors.newPassword}
        />
        <p className="-mt-3 text-xs leading-5 text-text-disabled">
          {passwordRequirements}
        </p>
        <AuthInput
          label="Confirm new password"
          id="change-confirm-password"
          type="password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          disabled={loading}
          error={fieldErrors.confirmPassword}
        />

        {error ? (
          <p className="rounded-2xl border border-danger bg-danger-soft px-4 py-3 text-sm text-danger-max">
            {error}
          </p>
        ) : null}
        <AuthButton loading={loading} disabled={loading} type="submit">
          Change password
        </AuthButton>
      </form>
    </AuthLayout>
  );
}
