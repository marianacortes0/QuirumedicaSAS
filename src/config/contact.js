// Centralized contact + WhatsApp Business config.
// El contacto del sitio se canaliza exclusivamente por WhatsApp Business.

// WhatsApp Business (formato 57 + número, sin símbolos).
const WHATSAPP_PHONE = '573213350417';

const PHONE_DISPLAY = '+57 321 3350417';
const PHONE_TEL = '+573213350417';
const EMAIL = 'ventas@quirumedica.com';

export const CONTACT = {
  companyName: 'Quirumédica',
  phoneDisplay: PHONE_DISPLAY,
  phoneTel: PHONE_TEL,
  email: EMAIL,
  location: 'Bogotá, Colombia',
  whatsapp: {
    phone: WHATSAPP_PHONE,
    defaultMessage:
      'Hola Quirumédica, deseo información sobre sus instrumentos quirúrgicos.',
    url: `https://wa.me/${WHATSAPP_PHONE}`,
  },
};

/**
 * Build a wa.me link with an optional pre-filled message.
 * @param {string} [message] - text shown in the chat compose box.
 * @returns {string} full WhatsApp URL.
 */
export function buildWhatsAppUrl(message = CONTACT.whatsapp.defaultMessage) {
  const base = `https://wa.me/${CONTACT.whatsapp.phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
