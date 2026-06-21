export default function CustomerLoading() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center bg-[var(--bg-primary)]">
      <div className="flex flex-col items-center gap-4 text-[var(--text-secondary)]">
        <i className="ph ph-spinner animate-spin text-3xl text-[var(--accent-primary)]"></i>
        <p className="font-mono text-sm tracking-wider uppercase">Loading...</p>
      </div>
    </div>
  );
}
