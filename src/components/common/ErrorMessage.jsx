import { TriangleAlert } from 'lucide-react';

// Errors explain what happened and how to recover — no apologies.
export function ErrorMessage({
  title = 'No fue posible cargar esta información',
  message = 'Revise la conexión e intente nuevamente.',
  onRetry,
}) {
  return (
    <div
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-xl border border-line bg-surface px-6 py-10 text-center"
    >
      <TriangleAlert className="size-7 text-accent-dark" aria-hidden="true" />
      <p className="font-display text-lg text-primary">{title}</p>
      <p className="text-sm text-muted">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
