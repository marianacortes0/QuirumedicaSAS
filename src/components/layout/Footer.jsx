import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Brandmark } from './Brandmark';
import { CONTACT, buildWhatsAppUrl } from '../../config/contact';

export function Footer() {
  return (
    <footer className="mt-auto bg-primary-dark text-white/80">
  <div className="caliper opacity-20" />
  <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1.2fr] lg:px-8">
    <div>
      <span className="inline-flex rounded-xl p-4">
        <Brandmark className="h-30 w-auto" />  {/* MUCHO más grande */}
      </span>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
        Instrumental quirúrgico de acero inoxidable para profesionales e
        instituciones de salud. Precisión, esterilidad y respaldo.
      </p>
    </div>
    

        <nav aria-label="Secciones">
          <p className="eyebrow !text-accent-light">Navegación</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Inicio</Link></li>
            <li><Link to="/tienda" className="hover:text-white">Tienda</Link></li>
            <li><Link to="/categorias" className="hover:text-white">Categorías</Link></li>
            <li><Link to="/nosotros" className="hover:text-white">Nosotros</Link></li>
            <li><Link to="/contacto" className="hover:text-white">Contacto</Link></li>
          </ul>
        </nav>

        <div>
          <p className="eyebrow !text-accent-light">Contacto</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-accent-light" aria-hidden="true" />
              <a href={`tel:${CONTACT.phoneTel}`} className="hover:text-white">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-accent-light" aria-hidden="true" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-accent-light" aria-hidden="true" />
              {CONTACT.location}
            </li>
          </ul>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--color-whatsapp)] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Escríbanos por WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {CONTACT.companyName}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
