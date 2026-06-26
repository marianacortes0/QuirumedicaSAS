// services/productsService.js — pure data access (no React, no hooks).
// Reads from the local mock. Swap the body for a fetch() to migrate to a
// real API without touching hooks, components or pages.
import products from '../data/products.json';

const clone = (data) => JSON.parse(JSON.stringify(data));

/** @returns {Promise<Array>} all products. */
export async function getProducts() {
  return clone(products);
}

/** @returns {Promise<Array>} only featured products. */
export async function getFeaturedProducts() {
  return clone(products.filter((p) => p.featured));
}

/**
 * @param {string} id
 * @returns {Promise<object|null>} a single product or null.
 */
export async function getProductById(id) {
  const found = products.find((p) => p.id === id);
  return found ? clone(found) : null;
}

/**
 * @param {string} categoryId
 * @returns {Promise<Array>} products within a category.
 */
export async function getProductsByCategory(categoryId) {
  return clone(products.filter((p) => p.categoryId === categoryId));
}
