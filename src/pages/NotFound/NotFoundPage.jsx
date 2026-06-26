import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 text-center">
      <div>
        <p className="font-mono text-sm tracking-[0.3em] text-accent-dark uppercase">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-primary">
          Página no encontrada
        </h1>
        <div className="caliper mx-auto mt-6 w-40" />
        <p className="mt-6 text-muted">
          La página solicitada no existe o cambió de ubicación.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
