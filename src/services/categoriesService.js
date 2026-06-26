// services/categoriesService.js — pure data access (no React, no hooks).
import categories from '../data/categories.json';

const clone = (data) => JSON.parse(JSON.stringify(data));

/** @returns {Promise<Array>} all categories. */
export async function getCategories() {
  return clone(categories);
}

/**
 * @param {string} id
 * @returns {Promise<object|null>} a single category or null.
 */
export async function getCategoryById(id) {
  const found = categories.find((c) => c.id === id);
  return found ? clone(found) : null;
}
