import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, BadgeCheck } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { ProductGallery } from '../../components/product/ProductGallery';
import { ProductCarousel } from '../../components/product/ProductCarousel';
import { CategoryCard } from '../../components/category/CategoryCard';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { buildWhatsAppUrl } from '../../config/contact';

export function HomePage() {
  const { products: featured, loading, error } = useProducts({ featured: true });
  const { products: all } = useProducts();
  const { categories } = useCategories();

  return (
    <>
      {/* ── Hero: la empresa, en breve ─────────────────────── */}
      <section className="relative">
        <div className="mx-auto flex min-h-[calc(100svh-11rem)] max-w-7xl flex-col px-4 pt-10 pb-6 sm:px-6 lg:min-h-[calc(100svh-13rem)] lg:px-8">
          <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* Texto del inicio — breve */}
            <div>
              <h1 className="mt-5 max-w-xl font-display text-4xl leading-[1.05] font-semibold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                Instrumental quirúrgico para el
                <span className="text-accent"> sector de la salud, con cotización directa </span>
              </h1>
              <div className="caliper mt-6 w-44" />
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Acero inoxidable para clínicas, hospitales y profesionales.
                Cotización por WhatsApp el mismo día hábil.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/tienda"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
                >
                  Ver catálogo
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent-dark"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Solicitar cotización
                </a>
              </div>
            </div>

            {/* Galería destacada — fotos reales, zoom al seleccionar */}
            <div className="flex flex-col justify-center">
              {loading ? (
                <Loader label="Cargando destacados" />
              ) : error ? (
                <ErrorMessage />
              ) : (
                <ProductGallery products={featured} />
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── Catálogo — grilla de fotos reales ──────────────── */}
      <section id="catalogo" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          
          title="Instrumentos destacados"
          intro="Cada instrumento se amplía al seleccionarlo, con su medida y su acabado."
        />
        <div className="mt-10">
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage />
          ) : (
            <ProductCarousel products={all} />
          )}
        </div>
        <div className="mt-10">
          <Link
            to="/tienda"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark hover:text-accent"
          >
            Ver todo el catálogo
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── Categorías ─────────────────────────────────────── */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading  title="Categorías" />
            <Link
              to="/categorias"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark hover:text-accent"
            >
              Ver todas
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 3).map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Calidad — sello + banner ───────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-white">
          <div className="caliper absolute inset-x-0 top-0 z-10 opacity-25" />
          <div className="grid items-stretch lg:grid-cols-2">
            {/* Sello de calidad */}
            <div className="order-2 p-8 sm:p-12 lg:order-1 lg:py-16">
              <div className="flex items-center gap-3">
                <BadgeCheck className="size-8 text-accent" aria-hidden="true" />
                <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                  Calidad
                </h2>
              </div>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-accent-light">
                Instrumentos fabricados con acero inoxidable que cumplen con los
                estándares internacionales de calidad ISO 7153-1 e ISO 13485.
              </p>
            </div>

            {/* Imagen — se funde con el fondo oscuro */}
            <div className="relative order-1 min-h-[16rem] lg:order-2 lg:min-h-[24rem]">
              <img
                src="/images/banner/instrumental-banner.jpg"
                alt="Instrumental quirúrgico de acero inoxidable"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary lg:bg-gradient-to-r lg:from-primary lg:via-primary/40 lg:to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
