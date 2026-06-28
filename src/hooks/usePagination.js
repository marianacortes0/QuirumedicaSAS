// hooks/usePagination.js — derives a paginated view of any list. Pure
// client-side slicing; knows nothing about products. Sits in the same layer
// as useProductFilter: it transforms an already-loaded array into a view.
import { useMemo, useState } from 'react';

/**
 * Paginate a list into fixed-size pages.
 * @param {Array} items - source list (already filtered/loaded).
 * @param {object} [opts]
 * @param {number} [opts.pageSize=10] - items per page.
 * @returns {{
 *   page: number, setPage: (p: number) => void, totalPages: number,
 *   pageItems: Array, pageSize: number, total: number,
 *   rangeStart: number, rangeEnd: number
 * }}
 */
export function usePagination(items, { pageSize = 10 } = {}) {
  const [page, setPage] = useState(1);

  // A new source list (e.g. after filtering or searching) restarts at page one.
  // React's recommended "adjust state during render" pattern — no effect, so it
  // resets in the same pass the list changes, with no extra paint.
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  // Guard the transient render before the reset above commits when the list
  // shrinks, so the slice below never reads out of range.
  const current = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (current - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, current, pageSize]);

  return {
    page: current,
    setPage,
    totalPages,
    pageItems,
    pageSize,
    total: items.length,
    rangeStart: items.length === 0 ? 0 : (current - 1) * pageSize + 1,
    rangeEnd: Math.min(current * pageSize, items.length),
  };
}
