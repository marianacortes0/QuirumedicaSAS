import { useEffect, useRef, useState } from 'react';

// Reveal: fades + slides its children in the first time they scroll into
// view. Dependency-free (IntersectionObserver). Honors prefers-reduced-motion
// by showing content immediately — the global CSS already neutralizes the
// transition, and we skip the observer entirely so nothing stays hidden.
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }) {
  const ref = useRef(null);
  // Reduced motion → start visible so nothing depends on the observer.
  const [shown, setShown] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
