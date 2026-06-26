import { CONTACT, buildWhatsAppUrl } from '../../config/contact';

// Floating WhatsApp badge, bottom-right. The official green mark links
// straight into a chat — no popup, no form.
export function WhatsAppFab() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir a ${CONTACT.companyName} por WhatsApp`}
      title="WhatsApp"
      className="group fixed right-5 bottom-5 z-50 inline-flex items-center gap-3 sm:right-6 sm:bottom-6"
    >
      {/* Label slides in on hover (desktop) for context */}
      <span className="hidden max-w-0 overflow-hidden rounded-full bg-primary px-0 py-2 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-300 group-hover:max-w-xs group-hover:px-4 group-hover:opacity-100 md:inline-block">
        Cotizar por WhatsApp
      </span>
      <img
        src="/images/whatsapp.png"
        alt="WhatsApp"
        className="size-16 rounded-full shadow-lg shadow-[var(--color-whatsapp)]/30 transition-transform duration-200 hover:scale-105 active:scale-95"
      />
    </a>
  );
}
