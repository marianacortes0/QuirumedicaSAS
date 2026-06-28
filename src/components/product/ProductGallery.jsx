import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { ProductLightbox } from './ProductLightbox';

// Galería de paneles que se expanden. Al pasar el cursor (escritorio) un panel
// crece; en móvil se apilan. Seleccionar cualquiera abre el zoom. Las fotos
// llenan el panel (object-cover) para que se vean grandes, no diminutas.
export function ProductGallery({ products }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(null);
  const items = products.slice(0, 5);

  return (
    <>
      <div className="flex flex-col gap-2 md:h-[28rem] md:flex-row">
        {items.map((p, i) => {
          const isActive = i === active;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setZoom(p)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-label={`Ampliar ${p.name}`}
              style={{ animationDelay: `${i * 90}ms` }}
              className={`anim-fade-up group relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-[#eef2f4] to-[#dde5e8] text-left transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-accent ${
                isActive
                  ? 'min-h-72 md:min-h-0 md:flex-[5]'
                  : 'min-h-28 md:min-h-0 md:flex-[1.4]'
              }`}
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className={`absolute inset-0 size-full transition-all duration-500 ${
                  isActive ? 'object-contain p-5' : 'object-cover'
                }`}
              />

              <span className="absolute top-3 right-3 z-10 grid size-8 place-items-center rounded-full bg-surface/85 text-accent-dark opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <ZoomIn className="size-4" aria-hidden="true" />
              </span>

              <div
                className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/95 via-primary/55 to-transparent p-5 text-white transition-all duration-500 ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-widest text-accent-light uppercase">
                  <ZoomIn className="size-3.5" aria-hidden="true" />
                  Clic para acercar
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <ProductLightbox product={zoom} onClose={() => setZoom(null)} />
    </>
  );
}
