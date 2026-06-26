import { Search, X } from 'lucide-react';

// Controlled search input. Owns no business logic — emits value upward.
export function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar por nombre o referencia…',
}) {
  return (
    <div className="relative w-full">
      <Search
        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Buscar productos"
        className="w-full rounded-xl border border-line bg-surface py-3 pr-11 pl-11 text-sm text-primary placeholder:text-muted focus:border-accent focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
          className="absolute top-1/2 right-3 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors hover:bg-paper hover:text-primary"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
