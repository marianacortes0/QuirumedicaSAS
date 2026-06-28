import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, BadgeCheck } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { ProductGallery } from '../../components/product/ProductGallery';
import { ProductCarousel } from '../../components/product/ProductCarousel';
import { CategoryCard } from '../../components/category/CategoryCard';
import { Reveal } from '../../components/common/Reveal';
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
              <h1 className="anim-fade-up mt-5 max-w-xl font-display text-4xl leading-[1.05] font-semibold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                Manejamos todo tipo de 
                <span className="text-accent"> instrumental quirúrgico </span>
              </h1>
              <div className="caliper anim-fade-up mt-6 w-44" style={{ animationDelay: '0.1s' }} />
              <p
                className="anim-fade-up mt-6 max-w-md text-lg leading-relaxed text-muted"
                style={{ animationDelay: '0.2s' }}
              >
                Acero inoxidable para clínicas, hospitales y profesionales.
                Cotización por WhatsApp el mismo día hábil.
              </p>

              <div
                className="anim-fade-up mt-8 flex flex-wrap gap-3"
                style={{ animationDelay: '0.3s' }}
              >
                <Link
                  to="/tienda"
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25 motion-reduce:hover:translate-y-0"
                >
                  Ver catálogo
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent-dark hover:shadow-md motion-reduce:hover:translate-y-0"
                >
                  <MessageCircle
                    className="size-4 transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  Solicitar cotización
                </a>
              </div>
            </div>

            {/* Galería destacada — fotos reales, zoom al seleccionar */}
            <div
              className="anim-fade-in flex flex-col justify-center"
              style={{ animationDelay: '0.25s' }}
            >
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
            <ProductCarousel products={all.slice(0, 10)} />
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
            {categories.slice(0, 3).map((c, i) => (
              <Reveal key={c.id} delay={i * 90} className="h-full">
                <CategoryCard category={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calidad — sello + banner ───────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="group relative overflow-hidden rounded-3xl bg-primary text-white">
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
                className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary lg:bg-gradient-to-r lg:from-primary lg:via-primary/40 lg:to-transparent" />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
