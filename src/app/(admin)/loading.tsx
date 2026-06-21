export default function AdminLoading() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-[var(--text-secondary)]">
        <i className="ph ph-spinner animate-spin text-3xl text-[var(--accent-primary)]"></i>
        <p className="font-mono text-sm tracking-wider uppercase">Loading Admin Data...</p>
      </div>
    </div>
  );
}
