export const passwordRequirements =
  "Use 8–20 characters with uppercase, lowercase, a number, and ! @ # $ % ^ & *.";

export function getPasswordValidationError(password) {
  if (password.length < 8 || password.length > 20) {
    return "Password must be between 8 and 20 characters.";
  }

  if (
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[!@#$%^&*]/.test(password)
  ) {
    return passwordRequirements;
  }

  return "";
}
