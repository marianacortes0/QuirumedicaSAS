// hooks/useProductFilter.js — derives a filtered view of products by
// category + free-text search. Pure client-side filtering.
import { useMemo, useState } from 'react';

/**
 * @param {Array} products - source list (already loaded).
 * @param {object} [opts]
 * @param {string} [opts.initialCategory] - preselected category id.
 */
export function useProductFilter(products, { initialCategory = 'all' } = {}) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = category === 'all' || p.categoryId === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.medidas?.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [products, category, query]);

  return {
    filtered,
    category,
    setCategory,
    query,
    setQuery,
    resultCount: filtered.length,
  };
}
