// hooks/useCategories.js — state + orchestration. Calls services only.
import { useEffect, useState } from 'react';
import { getCategories } from '../services/categoriesService';

/**
 * @returns {{ categories: Array, loading: boolean, error: Error|null }}
 */
export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    getCategories()
      .then((data) => {
        if (active) {
          setCategories(data);
          setError(null);
        }
      })
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  return { categories, loading, error };
}
