import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useProductFilter } from '../../hooks/useProductFilter';
import { ProductGrid } from '../../components/product/ProductGrid';
import { SearchBar } from '../../components/common/SearchBar';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramCategory = searchParams.get('categoria') ?? 'all';

  const { products, loading, error } = useProducts();
  const { categories } = useCategories();
  const { filtered, category, setCategory, query, setQuery, resultCount } =
    useProductFilter(products, { initialCategory: paramCategory });

  // Keep filter in sync when the category arrives via URL (e.g. from a card).
  useEffect(() => {
    setCategory(paramCategory);
  }, [paramCategory, setCategory]);

  const selectCategory = (id) => {
    setCategory(id);
    setSearchParams(id === 'all' ? {} : { categoria: id }, { replace: true });
  };

  const chips = [{ id: 'all', name: 'Todos' }, ...categories];

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Catálogo"
        title="Nuestros productos"
        intro="Filtre por categoría o nombre. Cada instrumento indica su medida y se cotiza por WhatsApp."
      />

      {/* Controls */}
      <div className="mt-10 flex flex-col gap-5">
        <div className="max-w-xl">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:px-0">
          {chips.map((c) => {
            const isActive = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => selectCategory(c.id)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-primary bg-primary text-white'
                    : 'border-line bg-surface text-muted hover:border-accent hover:text-primary'
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          {resultCount.toString().padStart(2, '0')} resultado
          {resultCount === 1 ? '' : 's'}
        </p>
      </div>

      {/* Results */}
      <div className="mt-8">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <ProductGrid products={filtered} />
        )}
      </div>
    </section>
  );
}
