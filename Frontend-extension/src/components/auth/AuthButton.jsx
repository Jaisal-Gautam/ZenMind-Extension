export default function AuthButton({ children, loading, disabled, type = "button" }) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-3xl bg-green-primary px-4 text-sm font-semibold text-white transition hover:bg-green-secondary disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {loading ? (
        <>
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
