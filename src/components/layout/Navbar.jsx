import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Brandmark } from './Brandmark';
import { buildWhatsAppUrl } from '../../config/contact';

const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/tienda', label: 'Productos' },
  { to: '/categorias', label: 'Categorías' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

function navLinkClass({ isActive }) {
  return [
    'relative py-1 text-sm font-medium transition-colors',
    isActive ? 'text-primary' : 'text-muted hover:text-primary',
    isActive
      ? "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-accent after:content-['']"
      : '',
  ].join(' ');
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur-md">
      {/* Three tracks so the logo sits dead-center regardless of side widths */}
      <nav className="mx-auto grid h-24 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:px-6 lg:h-32 lg:px-8">
        {/* Left: links (desktop) / menu toggle (mobile) */}
        <div className="flex items-center justify-self-start">
          <ul className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={navLinkClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg text-primary md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Center: the brand logo, large */}
        <Link
          to="/"
          aria-label="Quirumédica SAS — Inicio"
          onClick={() => setOpen(false)}
          className="justify-self-center"
        >
          <Brandmark className="h-16 w-auto sm:h-20 lg:h-28" />
        </Link>

        {/* Right: quote button */}
        <div className="flex items-center justify-end justify-self-end">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light md:inline-flex"
          >
            Cotizar
          </a>
        </div>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-surface md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block border-b border-line py-3 text-base font-medium ${
                      isActive ? 'text-accent-dark' : 'text-primary'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="py-3">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white"
                onClick={() => setOpen(false)}
              >
                Cotizar por WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
