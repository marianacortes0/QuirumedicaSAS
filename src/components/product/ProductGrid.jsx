import { PackageOpen } from 'lucide-react';
import { ProductCard } from './ProductCard';

// Responsive grid: 1 → 2 → 3 → 4 columns. Handles its own empty state.
export function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line py-16 text-center">
        <PackageOpen className="size-8 text-muted" aria-hidden="true" />
        <p className="font-display text-lg text-primary">Sin resultados</p>
        <p className="max-w-sm text-sm text-muted">
          No hay instrumentos con ese filtro. Intente con otra categoría o
          término de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
