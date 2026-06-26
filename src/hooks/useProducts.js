// hooks/useProducts.js — state + orchestration. Calls services only.
import { useEffect, useState } from 'react';
import {
  getProducts,
  getFeaturedProducts,
} from '../services/productsService';

/**
 * Load products. Pass { featured: true } for the home gallery.
 * @returns {{ products: Array, loading: boolean, error: Error|null }}
 */
export function useProducts({ featured = false } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const load = featured ? getFeaturedProducts : getProducts;
    load()
      .then((data) => {
        if (active) {
          setProducts(data);
          setError(null);
        }
      })
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [featured]);

  return { products, loading, error };
}
