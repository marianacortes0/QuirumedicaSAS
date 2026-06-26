import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import { CategoryCard } from '../../components/category/CategoryCard';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export function CategoriesPage() {
  const { categories, loading, error } = useCategories();
  const { products } = useProducts();

  const countFor = (categoryId) =>
    products.filter((p) => p.categoryId === categoryId).length;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Especialidades"
        title="Categorías de instrumental"
        intro="Catálogo organizado por función quirúrgica. Seleccione una categoría para ver sus instrumentos."
      />

      <div className="mt-10">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <CategoryCard key={c.id} category={c} count={countFor(c.id)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
