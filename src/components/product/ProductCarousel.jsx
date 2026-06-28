import { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Reveal } from '../common/Reveal';

// Carrusel horizontal de productos. Avanza solo de lado a lado y trae flechas
// manuales. Se pausa al pasar el cursor o al enfocar una tarjeta, y respeta
// "prefers-reduced-motion" (no auto-avanza).
export function ProductCarousel({ products, interval = 3500 }) {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const step = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('[data-card]');
    const gap = 20; // gap-5
    const amount = card ? card.offsetWidth + gap : track.clientWidth * 0.8;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (dir > 0 && atEnd) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: dir * amount, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || paused) return;
    const id = setInterval(() => step(1), interval);
    return () => clearInterval(id);
  }, [paused, interval, step]);

  return (
    <div
      role="region"
      aria-label="Carrusel de instrumentos"
      aria-roledescription="carrusel"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
      >
        {products.map((p, i) => (
          <div
            key={p.id}
            data-card
            className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%] xl:w-[23.5%]"
          >
            <Reveal delay={Math.min(i, 5) * 70} className="h-full">
              <ProductCard product={p} />
            </Reveal>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Anterior"
        className="absolute top-[38%] -left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/95 text-primary shadow-md backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white active:scale-95 sm:left-0"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Siguiente"
        className="absolute top-[38%] -right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/95 text-primary shadow-md backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white active:scale-95 sm:right-0"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}
