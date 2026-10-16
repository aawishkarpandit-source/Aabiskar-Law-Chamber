/** Lightweight full-page loader used while route chunks or data load. */
export default function LoadingSpinner() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <span className="flex flex-col items-center gap-4">
        <span
          className="h-10 w-10 animate-spin rounded-full border-2 border-t-transparent"
          style={{ borderColor: "var(--c-line)", borderTopColor: "var(--c-accent)" }}
        />
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: "var(--c-ink-faint)" }}
        >
          Loading
        </span>
      </span>
    </div>
  );
}
