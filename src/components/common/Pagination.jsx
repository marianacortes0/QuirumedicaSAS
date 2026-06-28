import { ChevronLeft, ChevronRight } from 'lucide-react';

// Builds the visible page sequence with ellipses, always keeping the first,
// last and a window around the current page. e.g. 1 … 4 5 6 … 12
function pageWindow(page, totalPages, span = 1) {
  const wanted = new Set([1, totalPages]);
  for (let p = page - span; p <= page + span; p++) {
    if (p >= 1 && p <= totalPages) wanted.add(p);
  }
  const out = [];
  let prev = 0;
  for (const p of [...wanted].sort((a, b) => a - b)) {
    if (p - prev > 1) out.push(`gap-${p}`);
    out.push(p);
    prev = p;
  }
  return out;
}

// Presentational pager. Owns no business logic — emits the requested page via
// onChange. Renders nothing for a single page.
export function Pagination({ page, totalPages, onChange, className = '' }) {
  if (totalPages <= 1) return null;

  const go = (p) => {
    if (p >= 1 && p <= totalPages && p !== page) onChange(p);
  };

  const cell =
    'grid size-10 place-items-center rounded-lg border text-sm font-medium transition-all duration-200';
  const arrow = `${cell} border-line bg-surface text-primary hover:scale-105 hover:border-accent hover:text-accent-dark active:scale-95 disabled:pointer-events-none disabled:opacity-40`;

  return (
    <nav
      aria-label="Paginación de productos"
      className={`flex items-center justify-center gap-1.5 ${className}`}
    >
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="Página anterior"
        className={arrow}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </button>

      {pageWindow(page, totalPages).map((item) =>
        typeof item === 'number' ? (
          <button
            key={item}
            type="button"
            onClick={() => go(item)}
            aria-label={`Página ${item}`}
            aria-current={item === page ? 'page' : undefined}
            className={`${cell} font-mono ${
              item === page
                ? 'border-primary bg-primary text-white'
                : 'border-line bg-surface text-muted hover:scale-105 hover:border-accent hover:text-primary active:scale-95'
            }`}
          >
            {item.toString().padStart(2, '0')}
          </button>
        ) : (
          <span
            key={item}
            aria-hidden="true"
            className="grid size-10 place-items-center text-muted"
          >
            …
          </span>
        ),
      )}

      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        aria-label="Página siguiente"
        className={arrow}
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
