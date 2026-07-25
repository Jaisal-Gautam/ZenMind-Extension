export default function AuthButton({
  children,
  loading,
  disabled,
  className = "",
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={` inline-flex h-12 w-full items-center justify-center gap-3 rounded-3xl bg-brand px-4 text-sm font-semibold text-text-inverse transition-colors hover:bg-brand-muted disabled:cursor-not-allowed disabled:bg-border-strong disabled:text-text-disabled
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-text-inverse/30 border-t-text-inverse" />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
