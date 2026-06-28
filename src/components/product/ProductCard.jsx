import { useState } from 'react';
import { MessageCircle, ZoomIn } from 'lucide-react';
import { buildWhatsAppUrl } from '../../config/contact';
import { ProductLightbox } from './ProductLightbox';

// Product tile. Selecting the photo opens the zoom view. If the image is
// missing it falls back to a steel placeholder stamped with the name.
export function ProductCard({ product }) {
  const [imgOk, setImgOk] = useState(true);
  const [zoom, setZoom] = useState(false);

  const quoteUrl = buildWhatsAppUrl(
    `Hola Quirumédica, deseo información sobre: ${product.name} (${product.medidas}).`,
  );

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl hover:shadow-primary/5 motion-reduce:hover:translate-y-0">
      {/* Hover signature: an accent caliper rule draws across the top —
          reads as a measurement tick, not the generic card-lift. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
      <button
        type="button"
        onClick={() => imgOk && setZoom(true)}
        aria-label={`Ampliar ${product.name}`}
        className="relative aspect-[4/3] cursor-zoom-in overflow-hidden bg-gradient-to-br from-[#eef2f4] to-[#dde5e8] focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-default"
        disabled={!imgOk}
      >
        {imgOk ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="grid size-full place-items-center px-6 text-center font-display text-lg font-semibold text-primary/20">
            {product.name}
          </span>
        )}
        {imgOk && (
          <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-surface/90 text-accent-dark opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            <ZoomIn className="size-4" aria-hidden="true" />
          </span>
        )}
        {/* Caliper baseline along the foot of the image */}
        <div className="caliper absolute inset-x-0 bottom-0 opacity-60" />
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg leading-snug font-semibold text-primary">
          {product.name}
        </h3>

        {product.descripcion && (
          <p className="mt-3 rounded-r-md border-l-2 border-accent bg-accent/[0.07] py-2 pr-3 pl-3 text-[0.8125rem] leading-relaxed font-medium text-accent-dark">
            {product.descripcion}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="font-mono text-sm font-medium tracking-widest text-muted uppercase">
            {product.medidas}
          </span>
          <a
            href={quoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-dark"
            aria-label={`Consultar ${product.name} por WhatsApp`}
          >
            <MessageCircle className="size-3.5" aria-hidden="true" />
            Consultar
          </a>
        </div>
      </div>

      {zoom && <ProductLightbox product={product} onClose={() => setZoom(false)} />}
    </article>
  );
}
