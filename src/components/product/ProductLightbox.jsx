import { useEffect, useRef, useState } from 'react';
import { X, ZoomIn, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../../config/contact';

// Zoom view for a selected product. The image starts contained; clicking it
// magnifies to 2.4× and follows the cursor (transform-origin), so the user
// can read the teeth, the tip, the engraving. Esc / backdrop / X all close.
export function ProductLightbox({ product, onClose }) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState('center');
  const [imgOk, setImgOk] = useState(true);
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!product) return null;

  const track = (e) => {
    if (!zoomed) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  const quoteUrl = buildWhatsAppUrl(
    `Hola Quirumédica, deseo información sobre: ${product.name} (${product.medidas}).`,
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-primary-dark/80 backdrop-blur-sm" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 grid max-h-[90svh] w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl md:grid-cols-[1.4fr_1fr]"
      >
        <figure className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#eef2f4] to-[#dde5e8]">
          {imgOk ? (
            <img
              src={product.image}
              alt={product.name}
              onMouseMove={track}
              onClick={() => setZoomed((z) => !z)}
              onError={() => setImgOk(false)}
              style={{ transformOrigin: origin }}
              className={`size-full object-contain p-6 transition-transform duration-300 ${
                zoomed ? 'scale-[2.4] cursor-zoom-out' : 'cursor-zoom-in'
              }`}
            />
          ) : (
            <div className="grid size-full place-items-center px-6 text-center">
              <span className="font-display text-xl font-semibold text-primary/25">
                {product.name}
              </span>
            </div>
          )}
          {imgOk && (
            <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-surface/90 px-2.5 py-1 font-mono text-[0.625rem] tracking-widest text-accent-dark uppercase backdrop-blur">
              <ZoomIn className="size-3.5" aria-hidden="true" />
              {zoomed ? 'Clic para alejar' : 'Clic para acercar'}
            </span>
          )}
        </figure>

        <div className="flex flex-col p-6 sm:p-7">
          <span className="font-mono text-[0.625rem] tracking-widest text-accent-dark uppercase">
            {product.medidas}
          </span>
          <h2 className="mt-2 font-display text-2xl leading-snug font-semibold text-primary">
            {product.name}
          </h2>

          <a
            href={quoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Consultar este instrumento
          </a>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-surface/90 text-primary shadow-sm transition-colors hover:bg-surface"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
