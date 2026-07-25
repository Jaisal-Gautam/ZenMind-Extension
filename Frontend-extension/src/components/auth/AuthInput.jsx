import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthInput({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled,
  inputMode,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <label htmlFor={id} className="block text-sm font-medium text-text">
      <span className="mb-2 block">{label}</span>

      <div className="relative">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          inputMode={inputMode}
          className={`
            w-full rounded-3xl
            border border-border-default
            bg-surface
            px-4 py-3
            text-sm text-text
            placeholder:text-text-disabled
            transition-colors
            focus:border-border-brand
            focus:outline-none
            focus:ring-2
            focus:ring-brand
            disabled:cursor-not-allowed
            disabled:bg-surface-muted
            disabled:text-text-disabled
            disabled:opacity-70
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="
              absolute inset-y-0 right-3
              inline-flex items-center
              rounded-full p-2
              text-text-disabled
              transition-colors
              hover:text-text
              focus:outline-none
              focus:ring-2
              focus:ring-brand
            "
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error?.map((message) => (
        <p key={message} className="mt-2 text-sm text-danger">
          {message}
        </p>
      ))}
    </label>
  );
}
