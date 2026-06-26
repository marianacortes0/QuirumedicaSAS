// A quiet, on-brand loading state: a sweeping caliper tick.
export function Loader({ label = 'Cargando…' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-4 py-16 text-muted"
    >
      <div className="relative h-1 w-40 overflow-hidden rounded-full bg-line">
        <span className="absolute inset-y-0 left-0 w-1/3 animate-[loader_1.1s_ease-in-out_infinite] rounded-full bg-accent" />
      </div>
      <span className="font-mono text-xs tracking-widest uppercase">
        {label}
      </span>
      <style>{`@keyframes loader{0%{transform:translateX(-100%)}100%{transform:translateX(400%)}}`}</style>
    </div>
  );
}
